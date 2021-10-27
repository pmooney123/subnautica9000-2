//initial vars
const canvas = document.getElementById('canvas')
const lHUD = document.getElementById('hud')
const ctx = canvas.getContext('2d')
const lctx = lHUD.getContext('2d')
lHUD.width = 200;
lHUD.height = 700;
canvas.width = 800;
canvas.height = 700;
let score = 0;
let gameFrame = 0;
let gameSpeed = 0;
lctx.font = '20px Georgia';
ctx.font = '50px Georgia';


//camera focus
class Camera {
    constructor() {
        this.x = 100;
        this.y = 100;

    }
    moveTo(x, y) {
        x = Math.round(x);
        y = Math.round(y);
        this.x = x - canvas.width/2;
        this.y = y - canvas.height/2;
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.x > -canvas.width + mapWidth * tileSize) {
            this.x = -canvas.width + mapWidth * tileSize;
        }
        if (this.y > -canvas.height + mapHeight * tileSize) {
            this.y = -canvas.height + mapHeight * tileSize;
        }
        if (this.x < 0) {
            this.x = 0;
        }
    }
    moveBy(x, y) {
        this.x += x;
        this.y += y;
    }
}
let camera = new Camera();


//input management
var leftPressed = false
var rightPressed = false
var upPressed = false
var downPressed = false

function keyDownHandler(e) {
    if ("code" in e) {
        switch(e.code) {
            case "Unidentified":
                break;
            case "ArrowRight":
            case "Right": // IE <= 9 and FF <= 36
            case "KeyD":
                rightPressed = true;
                return;
            case "ArrowLeft":
            case "Left": // IE <= 9 and FF <= 36
            case "KeyA":
                leftPressed = true;
                return;
            case "ArrowUp":
            case "Up": // IE <= 9 and FF <= 36
            case "KeyW":
                upPressed = true;
                return;
            case "ArrowDown":
            case "Down": // IE <= 9 and FF <= 36
            case "KeyS":
                downPressed = true;
                return;
            case "KeyP":
                return;
            case "KeyX":
                xPressed = true;
                return;
            case "Space":
                spacePressed = true;
                return;

            default:
                return;
        }
    }

    if(e.keyCode == 32) {
        spacePressed = true;
    }
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    if(e.keyCode == 40) {
        downPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
}
function keyUpHandler(e) {
    if ("code" in e) {
        switch(e.code) {
            case "Unidentified":
                break;
            case "ArrowRight":
            case "Right": // IE <= 9 and FF <= 36
            case "KeyD":
                rightPressed = false;
                return;
            case "ArrowLeft":
            case "Left": // IE <= 9 and FF <= 36
            case "KeyA":
                leftPressed = false;
                return;
            case "ArrowUp":
            case "Up": // IE <= 9 and FF <= 36
            case "KeyW":
                upPressed = false;
                return;
            case "ArrowDown":
            case "Down": // IE <= 9 and FF <= 36
            case "KeyS":
                downPressed = false;
                return;
            case "KeyX":
                xPressed = false;
                return;
            case "Space":
                spacePressed = false;
                return;
            default:
                return;
        }
    }

    if(e.keyCode == 32) {
        spacePressed = false;
    }
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    if(e.keyCode == 40) {
        downPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousedown', function(event) {
    let canvasPosition = canvas.getBoundingClientRect();
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;

    let dx = (player.x - camera.x) - mouse.x;
    let dy = (player.y - camera.y) - mouse.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    console.log(dist)

})
canvas.addEventListener('mouseup', function(event) {
    mouse.click = false;
})
