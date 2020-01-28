function Map(width, height, initialValue) {
    this.width = width;
    this.height = height;

    this.map = [];
    for (var y = 0; y < this.height; y++) {
        this.map.push([]);
        for (var x = 0; x < this.width; x++) {
            this.map[y].push(initialValue);
        }
    }

    this.mapCanvas = document.createElement('canvas');
    this.mapCanvasContext = this.mapCanvas.getContext('2d');

    this.setTile = function(x, y, tileCode) {
        this.map[y][x] = tileCode;
        this.mapCanvasContext.fillStyle = COLOR_CODE[tileCode];
        this.mapCanvasContext.fillRect(x, y, 1, 1);
    };

    this.setHeight = function(height) {
        if (this.height < height) {
            for (var i = 0; i < height - this.height; i++) {
                var row = [];
                for (var j = 0; j < this.width; j++) {
                    row.push(0);
                }
                this.map.push(row);
            }
        } else {
            for (var i = 0; i < this.height - height; i++) {
                this.map.pop();
            }
        }

        this.height = height;
        this.mapCanvas.height = height;
    };

    this.setWidth = function(width) {
        if (this.width < width) {
            for (var i = 0; i < height; i++)
                for (var j = 0; j < width - this.width; j++)
                    this.map[i].push(0);
        } else {
            for (var i = 0; i < height; i++)
                for (var j = 0; j < this.width - width; j++)
                    this.map[i].pop();
        }

        this.width = width;
        this.mapCanvas.width = width;
    };

    this.fill = function(color) {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                this.map[y][x] = color;
            }
        }
    };

    this.tick = function() {
        var x = Math.floor(plotX);
        var y = Math.floor(plotY);

        if (0 <= x && x < this.width) {
            if (0 <= y && y < this.height) {
                if (buttons[0]) {
                    if (map.map[y][x] != hotBar.selected)
                        connector.stle(x, y, hotBar.selected);
                }
            }
        }
    };

    this.render = function(context, camera) {
        // // old-school type map rendering
        // var canvasX;
        // var canvasY;
        // for (var y = 0; y < this.height; y++) {
        //     for (var x = 0; x < this.width; x++) {
        //         canvasX = camera.getCanvasX(x);
        //         canvasY = camera.getCanvasY(y);

        //         if (canvasX + camera.zoom >= 0 && canvasY + camera.zoom >= 0) {
        //             if (canvasX < canvasWidth && canvasY < canvasHeight) {
        //                 context.fillStyle = COLOR_CODE[this.map[y][x]];
        //                 context.fillRect(canvasX, canvasY, camera.zoom, camera.zoom);
        //             }
        //         }
        //     }
        // }

        context.scale(camera.zoom, camera.zoom);
        context.imageSmoothingEnabled = false;
        context.drawImage(this.mapCanvas, camera.getCanvasX(0) / camera.zoom, camera.getCanvasY(0) / camera.zoom);
        context.scale(1/camera.zoom, 1/camera.zoom);

        var startY = camera.getCanvasY(0);

        var startX = Math.max(camera.getCanvasX(0), 0);
        var endX = Math.min(camera.getCanvasX(this.width), canvasWidth);
        // upper border
        if (startY >= 0) {
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(endX, startY);
            context.stroke();
        }

        var endY = camera.getCanvasY(this.height);
        // lower border
        if (startY < canvasHeight) {
            context.beginPath();
            context.moveTo(startX, endY);
            context.lineTo(endX, endY);
            context.stroke();
        }

        startY = Math.max(startY, 0);
        endY = Math.min(endY, canvasHeight);

        // left border
        if (camera.getCanvasX(0) >= 0) {

            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(startX, endY);
            context.stroke();
        }

        // right border
        if (camera.getCanvasX(this.width) < canvasWidth) {
            context.beginPath();
            context.moveTo(endX, startY);
            context.lineTo(endX, endY);
            context.stroke();
        }
    };
}