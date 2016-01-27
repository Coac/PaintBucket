function InvalidImageEncoding(message) {
    this.message = message;
    this.name = "InvalidImageEncoding";
    this.toString = function() {
        return this.name + ": " + this.message;
    }
}
