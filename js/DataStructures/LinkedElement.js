/**
 * Represents a LinkedList Element.
 *
 * @param {LinkedElement} head - Reference to the head of the list
 * @param {LinkedElement} next - Reference to the next element of the list
 * @param {Object} val - Value of the element
 *
 * @constructor
 */
var LinkedElement = function (head, next, val) {
    this.head = head;
    this.next = next;
    this.val = val;
};

/**
 * Change the head of the element.
 *
 * @param {Head} head - New head for the element
 */
LinkedElement.prototype.setHead = function (head) {
    this.head = head;
};

/**
 * Get the head of the element.
 *
 * @return {Head} The head of the element
 */
LinkedElement.prototype.getHead = function () {
    return this.head;
};

/**
 * Change the next element.
 *
 * @param {LinkedElement} next - New next element for the current one
 */
LinkedElement.prototype.setNext = function (next) {
    this.next = next;
};

/**
 * Get the head of the element.
 *
 * @return {LinkedElement} The head of the element
 */
LinkedElement.prototype.getNext = function () {
    return this.next;
};

/**
 * Check if the current element is followed by another.
 *
 * @return boolean True if the next element exists, false otherwise
 */
LinkedElement.prototype.hasNext = function () {
    return this.next != null;
};

/**
 * Set a new value for the current element.
 *
 * @param {object} val
 */
LinkedElement.prototype.setVal = function (val) {
    this.val = val;
};

/**
 * Get the value of the current element.
 *
 * @return {object} val
 */
LinkedElement.prototype.getVal = function () {
    return this.val;
};
