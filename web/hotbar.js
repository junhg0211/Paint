function HotBar() {
    this.size = 48;

    this.selected = 0;

    this.thisFrameNotSelected = true;
    
    this.tick = function() {
        this.thisFrameNotSelected = true;
        if (mouseY > canvasHeight - this.size) {
            if (canvasWidth / 2 - this.size * 8 < mouseX && mouseX < canvasWidth / 2 + this.size * 8) {
                if (buttons[0]) {
                    this.selected = parseInt((mouseX - (canvasWidth / 2 - this.size * 8)) / this.size);
                    this.thisFrameNotSelected = false;
                }
            }
        }
    };

    this.render = function(context) {
        // let the margin size = this.size * 0.1

        margin = this.size * 0.1

        w = this.size * 1 * 16 + margin * 2;

        x = (canvasWidth - w) / 2;

        context.fillStyle = Color.BLACK;
        context.fillRect(x, canvasHeight - (this.size + margin), w, this.size + margin * 1)

        for (var i = 0; i < 16; i++) {
            y = canvasHeight - this.size;

            context.fillStyle = COLOR_CODE[i];
            context.fillRect(x + margin + this.size * i, y, this.size, this.size);
        }

        x = x + margin + this.size * this.selected;
        y = canvasHeight - (this.size + margin);

        context.fillStyle = Color.WHITE;
        context.fillRect(x, y, this.size, margin);
    };
}