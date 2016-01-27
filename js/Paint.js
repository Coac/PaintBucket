/**
 * Paint is used to manage matrix values and build LinkedLists. Methods are only called by Bucket, so Paint is
 * independent from it.
 *
 * @constructor
 */
var Paint = function () {
    this.whitePixels = []; // Initial array of white pixels
};

/**
 * This function can be used to generate a colored random image.
 *
 * @param sizeX - Width for the generated picture
 * @param sizeY - Height for the generated picture
 * @param probBlack - Black pixel generation probability (0 < probBlack < 1)
 *
 * @return {Array[][]} - The two dimensional matrix
 */
Paint.prototype.generate = function (sizeX, sizeY, probBlack) {
    var explodedData = [];

    explodedData[0] = "P1";
    explodedData[1] = sizeX + " " + sizeY;

    for (var y = 0; y < sizeY; ++y) {
        explodedData[y + 2] = "";
        for (var x = 0; x < sizeX; ++x) {
            explodedData[y + 2] += (Math.random() < probBlack ? 1 : 0);
        }
    }

    return this.buildMatrix(explodedData);
};

/**
 * Build the matrix from an array of strings.
 *
 * @param {string[]} explodedImageData - Array of string to be used for matrix building
 *
 * @return {Array[][]} - The two dimensional matrix
 */
Paint.prototype.buildMatrix = function (explodedImageData) {
    var matrix = [];
    var imageSize = explodedImageData[1].split(' '); // Getting image size information
    var imageX = imageSize[0];
    var imageY = imageSize[1];

    if (imageX === null || imageY === null || isNaN(parseInt(imageX)) || isNaN(parseInt(imageX))) {
        throw new InvalidImageEncoding("Image size is not defined by two numbers.");
    }

    explodedImageData.splice(0, 2);
    var imageData = explodedImageData.join('');
    imageData = imageData.replace(/ /g, ''); // Removing all spaces to have a normalized data

    var color;
    var intColor;
    var linkedElement;

    for (var y = 0; y < imageY; ++y) { // Building the matrix
        matrix[y] = [];
        for (var x = 0; x < imageX; ++x) {
            intColor = imageData[y * imageX + x];

            if (intColor == undefined) {
                throw new InvalidImageEncoding("Image data seems corrupted ! Please refresh the page and try again.");
            }

            color = (intColor == 1) ? new Color(0, 0, 0) : new Color(255, 255, 255);

            matrix[y][x] = linkedElement = DisjointSets.makeSet(new Pixel(color, x, y));

            if (color.isWhite()) {
                this.whitePixels.push(linkedElement);
            }
        }
    }

    return matrix;
};

/**
 * Color the pixels contained in the matrix.
 *
 * @param {Array[][]} matrix - The matrix to be processed
 */
Paint.prototype.createSetsByColor = function (matrix) {
    var start = new Date().getTime();

    // For each whitePixels, find connected pixel, check if same color, union
    for (var iP = 0; iP < this.whitePixels.length; ++iP) {
        var nextPixel = this.whitePixels[iP];
        var nextPixelHead = DisjointSets.findSet(nextPixel);

        var connectedPixels = [];
        var whitePixelX = nextPixel.getVal().getX();
        var whitePixelY = nextPixel.getVal().getY();
        if (whitePixelY < matrix.length - 1
            && nextPixel.getVal().isSameColor(matrix[whitePixelY + 1][whitePixelX].getVal())) {
            connectedPixels.push(matrix[whitePixelY + 1][whitePixelX]);
        }
        if (whitePixelX % matrix[0].length != matrix[0].length - 1
            && nextPixel.getVal().isSameColor(matrix[whitePixelY][whitePixelX + 1].getVal())) {
            connectedPixels.push(matrix[whitePixelY][whitePixelX + 1]);
        }

        for (var i = 0; i < connectedPixels.length; ++i) {
            var connectedPixelHead = DisjointSets.findSet(connectedPixels[i]);
            if (connectedPixelHead != null) {
                if (connectedPixelHead != nextPixelHead) {
                    DisjointSets.union(nextPixelHead, connectedPixelHead);
                }
            }
        }
    }

    var end = new Date().getTime();
    var time = end - start;
    console.log('[Execution Time][Adding color] ' + time + ' ms');
};

/**
 * Color with a random color the head of a pixel list.
 *
 * @param {LinkedElement} linkedElement - The element to color (only its head will be colored if needed to
 * save memory)
 *
 * @see colorize for the full matrix colorization
 */
Paint.prototype.addRandomColor = function (linkedElement) {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    var color = linkedElement.getHead().getFirstElement().getVal().getColor();

    if (color.isWhite()) {
        color = new Color(getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255));
        linkedElement.getHead().getFirstElement().getVal().setColor(color);

        return color;
    }

    return color;
};
