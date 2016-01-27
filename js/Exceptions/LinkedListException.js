function LinkedListException(message) {
    this.message = message;
    this.name = "LinkedListException";
    this.toString = function() {
        return this.name + ": " + this.message;
    }
}
