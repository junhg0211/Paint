function Camera(zoom) {
    this.targetZoom = zoom;
    
    this.targetX = 0;
    this.targetY = 0;

    this.x = this.targetX;
    this.y = this.targetY;
    this.zoom = this.targetZoom;

    this.speed = 10;  // speed * zoom / fps
    
    this.getCanvasX = function(plotX) {
        return canvasWidth / 2 + (plotX - this.x) * this.zoom;
    }
    
    this.getCanvasY = function(plotY) {
        return canvasHeight / 2 + (plotY - this.y) * this.zoom;
    }

    this.getPlotX = function(canvasX) {
        return canvasX / this.zoom - canvasWidth / (2 * this.zoom) + this.x;
    }

    this.getPlotY = function(canvasY) {
        return canvasY / this.zoom - canvasHeight / (2 * this.zoom) + this.y;
    }

    this.center = function() {
        this.targetX = map.width / 2;
        this.targetY = map.height / 2;
    }

    this.tick = function() {
        if (keys[KeyEvent.K_W]) {
            this.targetY -= this.speed / fps;
        } if (keys[KeyEvent.K_A]) {
            this.targetX -= this.speed / fps;
        } if (keys[KeyEvent.K_S]) {
            this.targetY += this.speed / fps;
        } if (keys[KeyEvent.K_D]) {
            this.targetX += this.speed / fps;
        } if (keys[KeyEvent.K_SPACE]) {
            this.targetZoom -= this.targetZoom / fps * 2;
            if (this.targetZoom < 1) {
                this.targetZoom = 1;
            }
        } if (keys[KeyEvent.K_SHIFT]) {
            this.targetZoom += this.targetZoom / fps * 2;
        }

        this.x += (this.targetX - this.x) / friction;
        this.y += (this.targetY - this.y) / friction;
        this.zoom += (this.targetZoom - this.zoom) / friction;
    }
}