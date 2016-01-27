function ColorException(message) {
    this.message = message;
    this.name = "ColorException";
    this.toString = function() {
        return this.name + ": " + this.message;
    }
}
