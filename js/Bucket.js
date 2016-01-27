/**
 * Bucket is the main application. Its function is to read an uploaded image, store it in a matrix (using paint
 * do decode data, so it is decoupled from data structures) and display it.
 * It also call Paint to color the current image.
 */
var Bucket = (function () {
    var form, render, loader, dlLink, chkDraw, chkGenerateDl;
    var reader;
    var matrix;
    var paint;

    /**
     * This section contains public methods.
     */
    return {

        /**
         * Use this method to initiate the application. Bucket.js is independent from the chosen
         * html structure.
         *
         * @param {Element} pictureForm - Form used to submit the image
         * @param {Element} renderBox - Canvas that will be used to display the result
         * @param {Element} loaderBox - Div used to show a loader
         * @param {Element} link - Download link for the picture (using a data link, can crash the browser)
         */
        init: function (pictureForm, renderBox, loaderBox, link) {
            checkBrowser();

            form = pictureForm;
            render = renderBox;
            loader = loaderBox;
            reader = new FileReader();
            matrix = [];
            dlLink = link;

            loader.style.display = 'none';

            addEventListeners(loader);
        },

        /**
         * This function is for test purpose only, to mock Bucket and permit draw picture tests.
         *
         * @param {Paint} mockedPaint
         * @param {Element} renderBox
         */
        mock: function (mockedPaint, renderBox, link) {
            render = renderBox;
            paint = mockedPaint;
            dlLink = link;

            return {
                write: function (specificMatrix) {
                    chkDraw = document.createElement('input');
                    chkDraw.checked = true;
                    chkGenerateDl = document.createElement('input');
                    chkGenerateDl.checked = true;
                    matrix = specificMatrix;
                    paint.createSetsByColor(matrix);
                    write();
                }
            }
        }
    };

    /**
     * Adds event listeners to activate file handling on form submitting and colorization when matrix is ready.
     *
     * @param {Element} loader - Loader to display during parsing and colorization
     */
    function addEventListeners(loader) {
        form.addEventListener('submit', upload);

        reader.addEventListener('loadend', function () { // This event will be triggered after file upload
            loader.style.display = 'none';
            parseImage(reader.result);
            loader.dispatchEvent(
                new Event('matrixReady')
            );
            paint.createSetsByColor(matrix);
            write();
        });
    }

    /**
     * Checks browser compatibility with file management.
     */
    function checkBrowser() {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            alert(
                'Your browser does not support File API ; the pbm file may not be readable.' +
                'Please try from another recent browser.'
            );
        }
    }

    /**
     * Calls when the upload button is pressed.
     *
     * @param {Event} submit - Event containing submitted information
     */
    function upload(submit) {
        paint = new Paint();
        chkDraw = submit.target.elements['drawPic'];
        chkGenerateDl = submit.target.elements['generateDl'];
        if (!chkDraw.checked && !chkGenerateDl.checked) {
            alert("Select an options before Paint");
            return;
        }

        submit.preventDefault();
        loader.style.display = 'block';
        matrix = [];
        var picture = submit.target.elements['picture'].files[0]; // Raw file sent using the form field
        read(picture);
    }

    /**
     * Reads the submitted picture (reading is asynchronous so page should not freeze, but it
     * depends on the browser, parseImage method is used to decode data and delegate the building of the matrix).
     *
     * @see parseImage for matrix building
     *
     * @param {Blob} picture - Raw picture uploaded using the form, which will be converted to a base64 url and decoded
     */
    function read(picture) {
        reader.readAsDataURL(picture);
    }

    /**
     * Parses the .pbm file, check its consistency and delegate the building of the matrix
     * (base64 decode and matrix building).
     *
     * @param {object} base64 - The base64 data object encoded file
     */
    function parseImage(base64) {
        var start = new Date().getTime();
        var decodedImageData, explodedImageData;

        base64 = base64.replace(/^[^,]+,/, ''); // Removing base64 encoding data descriptors
        decodedImageData = atob(base64);
        decodedImageData = decodedImageData.replace(/([#].*?[\n])/g, ''); // Removing all comments (starting by #)
        explodedImageData = decodedImageData.split('\n');

        if (explodedImageData[0] != 'P1') {
            alert('P1 magic number not found, image parsing might fail.');
        }

        matrix = paint.buildMatrix(explodedImageData);

        var end = new Date().getTime();
        var time = end - start;

        console.log('[Execution Time][Parsing Image] ' + time + ' ms');
    }

    /**
     * Draws current matrix to build a canvas and display it, also generates a download link.
     */
    function write() {
        var start = new Date().getTime();

        render.width = matrix[0].length;
        render.height = matrix.length;

        var file = 'P3\n' + render.width + ' ' + render.height + '\n255\n'; // Adds header file information

        var ctx = render.getContext('2d'); // Initialising canvas
        var imageData = ctx.getImageData(0, 0, render.width, render.height);
        var rawData = imageData.data;

        var currentIndex;
        var color;

        for (var y = 0; y < render.height; ++y) {
            for (var x = 0; x < render.width; ++x) {
                color = paint.addRandomColor(matrix[y][x]);

                if (chkDraw.checked) {
                    currentIndex = (y * render.width + x) * 4; // Canvas are using a special array structure. Colors are
                    rawData[currentIndex] = color.getRed(); // dispatched in 4 rows, one for red, one for green, one for
                    rawData[++currentIndex] = color.getGreen(); // blue and one for color intensity
                    rawData[++currentIndex] = color.getBlue();
                    rawData[++currentIndex] = 255;
                }

                if (chkGenerateDl.checked) {
                    file += pad(color.getRed(), 3) + " "; // We are also building the file at the same time to improve
                    file += pad(color.getGreen(), 3) + " "; // performances
                    file += pad(color.getBlue(), 3) + " ";

                    if ((x * y + x + 1) % 70 == 0) { // Adding newlines every 70 chars
                        file += '\n';
                    }
                }
            }
            file += '\n';
        }

        file = btoa(file);
        file = "data:image/x-portable-bitmap;base64," + file;
        ctx.putImageData(imageData, 0, 0);

        if (chkGenerateDl.checked) {
            dlLink.style.display = "block";
            dlLink.addEventListener('click', function (e) { // This trick avoids showing a preview of the link when hovering
                e.preventDefault();
                // the button to avoid huge browser lag
                var element = document.createElement('a');
                element.setAttribute('href', file);
                element.setAttribute('download', "picture.pbm");

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);

            });
        }

        var end = new Date().getTime();
        var time = end - start;
        console.log('[Execution Time][Drawing Canvas] ' + time + ' ms');
    }

    /**
     * Simple function adding trailing 0 at start of a number
     *
     * @param num Number to format
     * @param size Global number size
     * @return {string} Number with trailing zeros
     */
    function pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }
})();
