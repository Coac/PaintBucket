/**
 * Represents the head of a LinkedList.
 * Comparator useful for Contains and Find method, which lets the code be decoupled from elements.
 *
 * @param {LinkedElement} firstElement - First element of the LinkedList
 * @param {function} comparator - Comparator function used to compare LinkedList elements
 *
 * @constructor
 */
var Head = function (firstElement, comparator) {
    this.listLength = (firstElement == undefined ? 0 : 1);
    this.firstElement = firstElement;
    this.tail = firstElement;

    if (firstElement != undefined)
        firstElement.head = this;

    if (comparator == null) {
        this.comparator = function (a, b) {
            return a == b;
        };
    } else {
        this.comparator = comparator;
    }
};

/**
 * Get the size of the current list.
 *
 * @return {int} - The size of the current list
 */
Head.prototype.getListLength = function () {
    return this.listLength;
};

/**
 * Get the first element of the list.
 *
 * @return {LinkedElement} - The first element of the list
 */
Head.prototype.getFirstElement = function () {
    return this.firstElement;
};

/**
 * Set the first element of the list.
 *
 * @param {LinkedElement} linkedElement
 */
Head.prototype.setFirstElement = function (linkedElement) {
    var nextElement = this.firstElement.getNext();

    this.firstElement = linkedElement;
    linkedElement.setNext(nextElement);
};

/**
 * Get the tail of the current list.
 *
 * @return {LinkedElement} - Tail of the current list
 */
Head.prototype.getTail = function () {
    return this.tail;
};

/**
 * Set the tail of the current list.
 *
 * @param {LinkedElement} tail - New tail for the current list
 */
Head.prototype.setTail = function (tail) {
    this.tail = tail;
};

/**
 * Add a LinkedElement to the LinkedList.
 *
 * @param {object} obj - Element to be added to the list
 *
 * @return {LinkedElement} - The LinkedElement added to the list
 */
Head.prototype.add = function (obj) {
    var linkedElement = new LinkedElement(null, null, obj);

    if (this.listLength == 0) {
        linkedElement.setHead(this);
        this.firstElement = linkedElement;
    }
    else {
        linkedElement.setHead(this);
        this.tail.setNext(linkedElement);
    }

    this.tail = linkedElement;
    ++this.listLength;

    return linkedElement;
};

/**
 * Get the element at a specific index.
 *
 * @param ind - The index of the searched element
 *
 * @return {LinkedElement} - The element at the specified index
 *
 * @throws LinkedListException - If the index is bigger than the list size
 */
Head.prototype.getLinkedElementAt = function (ind) {
    if (ind >= this.listLength) {
        throw new LinkedListException("Out of bounds Exception");
    }

    var i = 0;
    var el = this.firstElement;
    while (i < ind) {
        el = el.getNext();
        ++i;
    }
    return el;
};

/**
 * Remove an element from its index.
 *
 * @param {int} ind - Index of the element to be removed
 *
 * @throws LinkedListException - If the index is bigger than the list size
 */
Head.prototype.removeAt = function (ind) {
    if (ind >= this.listLength || this.listLength == 0) {
        throw new LinkedListException("Out of bounds Exception");
    }

    if (ind == 0) {
        if (this.listLength > 1) {
            this.firstElement = this.firstElement.getNext();
        } else {
            this.firstElement = null;
            this.tail = null;
        }
    }
    else {
        var linkedElement = this.getLinkedElementAt(ind - 1);
        if (ind == this.listLength - 1) {
            linkedElement.setNext(null);
        } else {
            linkedElement.setNext(linkedElement.getNext().getNext());
        }
    }
    --this.listLength;
};

/**
 * Find an element by value, using the comparator function. Useful for test purposes.
 *
 * @param {object} val - Value of the searched element
 *
 * @return {int} - The index of the value or the list size if not found
 */
Head.prototype.find = function (val) {
    var i = 0;
    var el = this.firstElement;

    while (i < this.listLength && !this.comparator(el.getVal(), val)) {
        el = el.getNext();
        i++;
    }

    return i;
};

/**
 * Check if the list contains a specified value.
 *
 * @param {object} val - Value of the searched element
 *
 * @return {boolean} - True if the value is found, false otherwise
 */
Head.prototype.contains = function (val) {
    return this.find(val) != this.listLength;
};

/**
 * Concatenate two LinkedList.
 *
 * @param {Head} otherHead - The second list head used to concat with 'this'
 */
Head.prototype.concat = function (otherHead) {
    if (otherHead.getListLength() == 0) {
        return;
    }

    if (this.listLength == 0) {
        this.firstElement = otherHead.getFirstElement();
    } else {
        this.tail.setNext(otherHead.getFirstElement());
    }

    this.tail = otherHead.getTail();
    this.listLength += otherHead.getListLength();

    var currentElement = otherHead.getFirstElement();
    while (currentElement != null) {
        currentElement.setHead(this);
        currentElement = currentElement.getNext();
    }
};

/**
 * Concatenate two LinkedList without using tail.
 *
 * @param {Head} otherHead - The second list head used to concat with 'this'
 */
Head.prototype.concat2 = function (otherHead) {
    if (otherHead.getListLength() == 0) {
        return;
    }

    var secondElement;
    if (this.listLength == 0) {
        this.firstElement = otherHead.getFirstElement();
    } else {
    	secondElement = this.firstElement.getNext();
        this.firstElement.setNext(otherHead.getFirstElement());
    }

    this.listLength += otherHead.getListLength();

    var currentElement = otherHead.getFirstElement();
    while (currentElement != null) {
        currentElement.setHead(this);

        if(currentElement.getNext() == null)
        	break;
        currentElement = currentElement.getNext();
    }
    currentElement.setNext(secondElement);
};


/**
 * For each iterator, to perform forEach loops on the elements (specific to javascript language).
 *
 * @param {function} callback - The function to be used for each element of the list
 */
Head.prototype.forEach = function (callback) {
    var i = 0;
    var el = this.getFirstElement();

    while (i < this.listLength) {
        callback(el.getVal(), i);
        el = el.getNext();
        i++;
    }
};

/**
 * To string method, useful for test purposes.
 *
 * @return {string} - String representation of the head
 */
Head.prototype.toString = function () {
    var str = '{ ';

    var currentElement = this.firstElement;
    while (currentElement != null) {
        str += (currentElement.getVal()) + ' , ';
        currentElement = currentElement.getNext();
    }

    return str + '}';
};

/**
 * Return an iterator of the Head.
 *
 * Example of use:
 *            var it = lk.getIterator();
 *            while(it.hasNext())
 *                console.log(it.next());
 *
 * @type {{next, hasNext}}
 */
Head.prototype.getIterator = function () {
    var i = 0;
    var el = this.getFirstElement();
    var length = this.listLength;

    return {
        next: function () {
            if (i != 0) {
                el = el.getNext();
            }
            ++i;
            return el.getVal();
        },
        hasNext: function () {
            return i < length;
        }
    }
};
