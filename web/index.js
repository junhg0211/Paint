const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");

var hud = false;

var keys = [];
var buttons = [];

var canvasWidth = 0;
var canvasHeight = 0;

var mouseX = 0;
var mouseY = 0;

var plotX;
var plotY;

var camera;
var map;
var hotBar;

var connector;

(function setup() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    for (var i = 0; i < 256; i++) {
        keys.push(false);
    }
    for (var i = 0; i < 5; i++) {
        buttons.push(false);
    }

    connector = new Connector();

    camera = new Camera(16);
    map = new Map(1, 1, 0);
    hotBar = new HotBar();

    camera.center();

    var frameDurationInMillis = 1000 / fps;
    window.setInterval(() => {
        tick();
        render();
    }, frameDurationInMillis);
}());

function tick() {
    camera.tick();
    hotBar.tick();
    if (hotBar.thisFrameNotSelected) {
        map.tick();
    }

    plotX = camera.getPlotX(mouseX);
    plotY = camera.getPlotY(mouseY);
}

function render() {
    // background
    ctx.fillStyle = Color.WHITE;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    map.render(ctx, camera);

    // selection block
    ctx.drawStyle = Color.BLACK;
    ctx.strokeRect(camera.getCanvasX(Math.floor(plotX)), camera.getCanvasY(Math.floor(plotY)), camera.zoom, camera.zoom);

    hotBar.render(ctx);

    // crosshair
    ctx.drawStyle = Color.BLACK;
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2 - 10, canvasHeight / 2);
    ctx.lineTo(canvasWidth / 2 + 10, canvasHeight / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, canvasHeight / 2 - 10);
    ctx.lineTo(canvasWidth / 2, canvasHeight / 2 + 10);
    ctx.stroke();

    if (hud) {
        ctx.fillStyle = Color.BLACK;
        ctx.font = "16px monospace";
        ctx.fillText(`(${Math.round(camera.x*1000)/1000}, ${Math.round(camera.y*1000)/1000}) x${camera.zoom}`, 0, 16);
        ctx.fillText(`B(${Math.floor(plotX)}, ${Math.floor(plotY)}), M(${plotX}, ${plotY})`, 0, 32);
    }
}

window.addEventListener("keydown", (event) => {
    keys[event.keyCode] = true;
});

window.addEventListener("keyup", (event) => {
    keys[event.keyCode] = false;
});

window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

window.addEventListener("mousedown", (event) => {
    buttons[event.button] = true;
});

window.addEventListener("mouseup", (event) => {
    buttons[event.button] = false;
});

window.addEventListener("wheel", (event) => {
    tmp = event.deltaY / -75;
    camera.targetZoom = Math.max(camera.targetZoom * (tmp > 0 ? tmp : -1 / tmp), MINIMUM_SCALE);
});

window.addEventListener("resize", (event) => {
    canvasWidth = event.currentTarget.innerWidth;
    canvasHeight = event.currentTarget.innerHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
});

