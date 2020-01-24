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

    this.setTile = function(x, y, tileCode) {
        this.map[y][x] = tileCode;
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
        var canvasX;
        var canvasY;
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                canvasX = camera.getCanvasX(x);
                canvasY = camera.getCanvasY(y);

                if (canvasX + camera.zoom >= 0 && canvasY + camera.zoom >= 0) {
                    if (canvasX < canvasWidth && canvasY < canvasHeight) {
                        context.fillStyle = COLOR_CODE[this.map[y][x]];
                        context.fillRect(canvasX, canvasY, camera.zoom, camera.zoom);
                    }
                }
            }
        }

        var startY = camera.getCanvasY(0);

        var startX = Math.max(camera.getCanvasX(0), 0);
        var endX = Math.min(camera.getCanvasX(this.width), canvasWidth);
        // upper border
        if (startY >= 0) {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, startY);
            ctx.stroke();
        }

        var endY = camera.getCanvasY(this.height);
        // lower border
        if (startY < canvasHeight) {
            ctx.beginPath();
            ctx.moveTo(startX, endY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }

        startY = Math.max(startY, 0);
        endY = Math.min(endY, canvasHeight);

        // left border
        if (camera.getCanvasX(0) >= 0) {

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX, endY);
            ctx.stroke();
        }

        // right border
        if (camera.getCanvasX(this.width) < canvasWidth) {
            ctx.beginPath();
            ctx.moveTo(endX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    };
}