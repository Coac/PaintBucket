/**
 * Represents a color.
 * The color is stocked using the RGB color model (0-255 range).
 *
 * @constructor
 *
 * @param {int} red - Red color (from 0 to 255)
 * @param {int} green - Green color (from 0 to 255)
 * @param {int} blue - Blue color (from 0 to 255)
 *
 * @throws {ColorException} - If a color is not in the right range
 */
var Color = function (red, green, blue) {
    if(!this.isValidColor(red) || !this.isValidColor(green) || !this.isValidColor(blue)) {
        throw new ColorException("Red, green and blue value must be between 0 and 255");
    }

    this.red = red;
    this.green = green;
    this.blue = blue;
};

/**
 * Get the red color.
 *
 * @return {int} - Red color represented by an integer
 */
Color.prototype.getRed = function () {
    return this.red;
};

/**
 * Get the green color.
 *
 * @return {int} - Green color represented by an integer
 */
Color.prototype.getGreen = function () {
    return this.green;
};

/**
 * Get the blue color.
 *
 * @return {int} - Blue color represented by an integer
 */
Color.prototype.getBlue = function () {
    return this.blue;
};

/**
 * Check if color is in the good range.
 *
 * @param color - Color to test
 * @return {boolean} - True if color is between 0 and 255, false otherwise
 */
Color.prototype.isValidColor = function(color) {
    return !(color < 0 || color > 255);
};

/**
 * Indicates weather a pixel is white or not.
 *
 * @return {boolean} - True if the pixel is white, false otherwise
 */
Color.prototype.isWhite = function () {
    return (
        this.red == 255 &&
        this.green == 255 &&
        this.blue == 255
    );
};

/**
 * Indicates weather a pixel is black or not.
 *
 * @return {boolean} - True if the pixel is black, false otherwise
 */
Color.prototype.isBlack = function () {
    return (
        this.red == 0 &&
        this.green == 0 &&
        this.blue == 0
    );
};

/**
 * Indicates if two colors are the same.
 *
 * @param {Color} otherColor - Color to compare with
 * @return {boolean} - True if colors are equal, false otherwise
 */
Color.prototype.equals = function (otherColor) {
    return (
        this.red == otherColor.getRed() &&
        this.green == otherColor.getGreen() &&
        this.blue == otherColor.getBlue()
    );
};
