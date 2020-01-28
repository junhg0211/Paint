function Map(width, height, initialValue) {
    this.mapCanvas = document.createElement('canvas');
    this.mapCanvas.width = width;
    this.mapCanvas.height = height;
    this.mapCanvasContext = this.mapCanvas.getContext('2d');

    this.setTile = function(x, y, tileCode) {
        this.mapCanvasContext.fillStyle = COLOR_CODE[tileCode];
        this.mapCanvasContext.fillRect(x, y, 1, 1);
    };

    this.setHeight = function(height) {
        this.mapCanvas.height = height;
    };

    this.setWidth = function(width) {
        this.mapCanvas.width = width;
    };

    this.fill = function(color) {
        this.mapCanvasContext.fillStyle = color;
        this.mapCanvasContext.fillRect(0, 0, this.mapCanvas.width, this.mapCanvas.height);
    };

    this.tick = function() {
        var x = Math.floor(plotX);
        var y = Math.floor(plotY);

        if (0 <= x && x < this.mapCanvas.width) {
            if (0 <= y && y < this.mapCanvas.height) {
                if (buttons[0]) {
                    if (getColorCode(this.mapCanvasContext.getImageData(x, y, 1, 1).data) != COLOR_CODE[hotBar.selected]) {
                            connector.stle(x, y, hotBar.selected);
                    }
                }
            }
        }
    };

    this.render = function(context, camera) {
        context.scale(camera.zoom, camera.zoom);
        context.imageSmoothingEnabled = false;
        context.drawImage(this.mapCanvas, camera.getCanvasX(0) / camera.zoom, camera.getCanvasY(0) / camera.zoom);
        context.scale(1/camera.zoom, 1/camera.zoom);

        var startY = camera.getCanvasY(0);

        var startX = Math.max(camera.getCanvasX(0), 0);
        var endX = Math.min(camera.getCanvasX(this.mapCanvas.width), canvasWidth);
        // upper border
        if (startY >= 0) {
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(endX, startY);
            context.stroke();
        }

        var endY = camera.getCanvasY(this.mapCanvas.height);
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
        if (camera.getCanvasX(this.mapCanvas.width) < canvasWidth) {
            context.beginPath();
            context.moveTo(endX, startY);
            context.lineTo(endX, endY);
            context.stroke();
        }
    };
}