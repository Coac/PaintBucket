function AssertException(message) {
    this.message = message;
    this.name = "AssertException";
    this.toString = function() {
        return this.name + ": " + this.message;
    }
}
