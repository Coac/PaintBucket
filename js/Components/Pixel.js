/**
 * Represents a Pixel, which is a color associated to a position.
 *
 * @param {Color} color - Color for the pixel
 * @param {int} posX - Abscissa of the pixel in the image
 * @param {int} posY - Ordinate of the pixel in the image
 *
 * @constructor
 */
var Pixel = function (color, posX, posY) {
    this.color = color;
    this.position = {
        x: posX,
        y: posY
    };
};

/**
 * Get the color of the pixel.
 *
 * @return {Color} - Current color of the pixel
 */
Pixel.prototype.getColor = function () {
    return this.color;
};

/**
 * Set the color of the pixel.
 *
 * @param {Color} color - New color for the pixel
 */
Pixel.prototype.setColor = function (color) {
    this.color = color;
};

/**
 * Get the abscissa of the pixel.
 *
 * @return {int} - Position in the horizontal axis
 */
Pixel.prototype.getX = function () {
    return this.position.x;
};

/**
 * Get the ordinate of the pixel.
 *
 * @return {int} - Position in the vertical axis
 */
Pixel.prototype.getY = function () {
    return this.position.y;
};

/**
 * Indicates weather a pixel is white or not.
 *
 * @return {boolean} - True if the pixel is white, false otherwise
 */
Pixel.prototype.isWhite = function () {
    return this.color.isWhite();
};

/**
 * Indicates weather a pixel is black or not.
 *
 * @return {boolean} - True if the pixel is black, false otherwise
 */
Pixel.prototype.isBlack = function () {
    return this.color.isBlack();
};

/**
 * Indicates weather a pixel is black or not.
 *
 * @return {boolean} - False if the pixel is black, false otherwise
 */
Pixel.prototype.isSameColor = function (pixel) {
    return this.color.equals(pixel.getColor());
};
