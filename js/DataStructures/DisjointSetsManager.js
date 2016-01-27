/**
 * DisjointSets Manager is working to organize sets and delegate union, set creation, ...
 *
 * @constructor
 */
var DisjointSets = function () {
};

/**
 * Create a new set. The representative element value will be passed by argument.
 *
 * @param {object} elementValue - The element value to build a set from
 *
 * @return {LinkedElement} - the created LinkedElement
 */
DisjointSets.makeSet = function (elementValue) {
	if(elementValue == null) {
        return null;
    }
	
    var linkedElement = new LinkedElement(null, null, elementValue);
    new Head(linkedElement, this.comparator);

    return linkedElement;
};

/**
 * Get the representative element of a LinkedElement.
 *
 * @param {LinkedElement} element
 *
 * @return {Head} his representative
 */
DisjointSets.findSet = function (element) {
	if(element == null) {
        return null;
    }

    return element.getHead();
};

/**
 * Appends the two sets.
 *
 * @param {Head} firstElement - an element which belong to the first set
 * @param {Head} secondElement - an element which belong to the second set
 */
DisjointSets.union = function (firstElement, secondElement) {
    if (firstElement.getListLength() < secondElement.getListLength()) {
        secondElement.concat(firstElement);
    }
    else {
        firstElement.concat(secondElement);
    }
};

/**
 * Appends the two sets.
 *
 * @param {Head} firstElement - an element which belong to the first set
 * @param {Head} secondElement - an element which belong to the second set
 */
DisjointSets.union2 = function (firstElement, secondElement) {
    if (firstElement.getListLength() < secondElement.getListLength()) {
        secondElement.concat2(firstElement);
    }
    else {
        firstElement.concat2(secondElement);
    }
};
