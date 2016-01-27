var Tests = (function () {
    var canvas;

    function assertEquals(a, b) {
        if (a != b) {
            throw "AssertEquals Error : " + a + '==' + b;
        }
        console.log(a + '==' + b + ' OK');
    }

    function testPixel() {
        console.log("#######################################");
        console.log("########## NOW TESTING PIXEL ##########");
        console.log("#######################################");

        var pixel = new Pixel(new Color(1, 2, 3), 4, 5);
        assertEquals(pixel.getX(), 4);
        assertEquals(pixel.getY(), 5);
        var white = new Pixel(new Color(255, 255, 255), 0, 0);
        assertEquals(white.isWhite(), true);
        assertEquals(pixel.isWhite(), false);
        assertEquals(white.isSameColor(new Pixel(new Color(255, 255, 255), 0, 0)), true);
        assertEquals(white.isSameColor(pixel), false);
    }

    function testLinkedElement() {
        console.log("#######################################");
        console.log("###### NOW TESTING LinkedElement #######");
        console.log("#######################################");

        var head = new LinkedElement(null, null, 'iam head');
        var next = new LinkedElement(null, null, null);
        var a = new LinkedElement(head, next, 'val');
        assertEquals(a.getHead(), head);
        assertEquals(a.getNext(), next);
        assertEquals(a.getVal(), 'val');
        assertEquals(head.getHead(), null);
        assertEquals(head.getNext(), null);
        assertEquals(head.getVal(), 'iam head');
        assertEquals(next.getHead(), undefined);
        assertEquals(next.getNext(), undefined);
        assertEquals(next.getVal(), undefined);
    }

    function testHead() {
        console.log("##################################################");
        console.log("####### NOW TESTING Head (aka LinkedList) ########");
        console.log("##################################################");

        var lk = new Head(null, null);
        lk.add(0);
        lk.add(1);
        lk.add('HERE');

        assertEquals(lk.getListLength(), 3);

        var lk2 = new Head(null, null);
        lk2.add(0);
        lk2.add(1);
        lk2.add('HERE');
        lk2.add('HEREssss');

        assertEquals(lk2.getListLength(), 4);

        lk.concat(lk2);

        assertEquals(lk.getListLength(), 7);
        assertEquals(lk.contains('HEREssss'), true);
        assertEquals(lk.contains('Nooooo'), false);
        assertEquals(lk.getLinkedElementAt(0).getVal(), 0);
        assertEquals(lk.getLinkedElementAt(1).getVal(), 1);
        assertEquals(lk.getLinkedElementAt(2).getVal(), 'HERE');
        assertEquals(lk.getLinkedElementAt(3).getVal(), 0);
        assertEquals(lk.getLinkedElementAt(4).getVal(), 1);
        assertEquals(lk.getLinkedElementAt(5).getVal(), 'HERE');
        assertEquals(lk.getLinkedElementAt(6).getVal(), 'HEREssss');

        var lk3 = new Head(null, null);
        lk3.concat(lk);

        var elHead = lk3.getFirstElement();
        var el = elHead.getNext();
        while (el != null) {
            assertEquals(lk3, el.getHead());
            el = el.next;
        }

        lk3.add('OK');

        assertEquals(lk3.find('OK'), 7);
        assertEquals(lk3.find('HEREssss'), 6);
    }

    function testSets() {
        console.log("#######################################");
        console.log("########## NOW TESTING SETS ###########");
        console.log("#######################################");

        var ok = DisjointSets.makeSet('ok');
        var ko = DisjointSets.makeSet('ko');
        DisjointSets.union(DisjointSets.findSet(ok), DisjointSets.findSet(ko));

        assertEquals(DisjointSets.findSet(ko), DisjointSets.findSet(ok));
        assertEquals(DisjointSets.findSet(null), null);
        assertEquals(DisjointSets.makeSet(null), null);
    }

    function testGenerate() { // Test suite will not pass if an exception is thrown
        console.log("#######################################");
        console.log("######## NOW GENERATING IMAGE #########");
        console.log("#######################################");

        var start = new Date().getTime();

        var paint = new Paint();
        var matrix = paint.generate(500, 500, 0.5);
        Bucket.mock(paint, canvas, document.getElementById('dl')).write(matrix);

        var end = new Date().getTime();
        var time = end - start;

        console.log('Time for generating and colorizing generated image : ' + time + 'ms');
    }

    function testPaint() {
        console.log("#######################################");
        console.log("########## NOW TESTING PAINT ##########");
        console.log("#######################################");

        var matrix = (new Paint()).buildMatrix(["P1", "0 0", "0"]);

        assertEquals(matrix.length, 0);

        matrix = (new Paint()).buildMatrix(["P1", "1 1", "0", "0"]);

        assertEquals(matrix.length, 1);

        var paint = new Paint();
        matrix = paint.buildMatrix(["P1", "10 10", "0000010000",
            "0000010000",
            "0000010000",
            "0000010000",
            "0000010000",
            "0000010000",
            "0000010000",
            "0000010000",
            "0000010000",
            "0000010000"
        ]);

        assertEquals(matrix.length, 10);
        assertEquals(matrix[0].length, 10);

        var nbPixelBlack = 0;
        var nbPixelWhite = 0;
        for (var i = matrix.length - 1; i >= 0; i--) {
            for (var j = matrix[0].length - 1; j >= 0; j--) {
                if (matrix[i][j].getVal().isBlack())
                    nbPixelBlack++;
                else if (matrix[i][j].getVal().isWhite())
                    nbPixelWhite++;
            }
        }

        assertEquals(nbPixelBlack, 10);
        assertEquals(nbPixelWhite, 90);

        paint.createSetsByColor(matrix);

        var nbBlack = 0;
        var nbNonWhite = 0;
        for (var i = matrix.length - 1; i >= 0; i--) {
            for (var j = matrix[0].length - 1; j >= 0; j--) {
                var color = paint.addRandomColor(matrix[i][j]);
                if (color.isBlack())
                    nbBlack++;
                if (!color.isWhite())
                    nbNonWhite++;
            }
        }

        assertEquals(nbBlack, 10);
        assertEquals(nbNonWhite, 100);
    }

    return {
        /**
         * This function can be used to run the test suite.
         *
         * @param {Element} htmlCanvas - Canvas to display generated image
         */
        launch: function (htmlCanvas) {
            canvas = htmlCanvas;

            console.log("#######################################");
            console.log(" WELCOME TO THE PAINTBUCKET TEST SUITE ");
            console.log("#######################################");
            console.log("");

            testPixel();
            testHead();
            testLinkedElement();
            testSets();
            testGenerate();
            testPaint();
        }
    }
})();
