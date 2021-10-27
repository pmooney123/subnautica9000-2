class Tile {
    constructor(x, y, red, green, blue, col) {
        this.x = x;
        this.y = y;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = 0.1;
        this.collision = col;
        this.updateColor();
    }
    updateColor() {
        this.color = 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + this.alpha + ')';
    }
    updateLighting() {
        //0 = black
        //1 = full brightness
        let dx = player.cx() - ((this.x+0.5) * tileSize);
        let dy = player.cy() - ((this.y+0.5) * tileSize);
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (this.x == 0 && this.y == 0) {
            console.log("tile: " + this.x + " " + this.y + " dist: " + dist + " dark: " + this.alpha)
        }
        this.alpha = (player.light*1000)/(dist * dist);
        if (this.alpha > 0.95) {
            this.alpha = 0.95;
        }
        if (this.alpha < 0.05) {
            this.alpha = 0.05;
        }
        this.updateColor();
    }
}

class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tilemap = [];

        for (let x = 0; x < width; x++) {
            this.tilemap[x] = [];

            for (let y = 0; y < height; y++) {
                let green = 0;
                let blue = 125;
                let red = 0;
                green = this.isOcean(x, y) ? 0 : 125;
                let col = green > 0 ? true : false;
                this.tilemap[x][y] = new Tile(x, y, red, green, blue, col);
            }

        }
    }
    isOcean(x, y) {
        let slope = -0.5;
        let b = 100;
        if (y < (slope * x + b) + (Math.sin(x))) {
            return true;
        } else {
            return false;
        }
    }
    draw(ctx, tileSize, camera) {
            let cx = Math.round(camera.x);
            let cy = Math.round(camera.y);

            let startX = Math.round(cx / tileSize);
            let startY = Math.round(cy / tileSize);

            let endX = Math.round((cx + canvas.width) / tileSize);
            let endY = Math.round((cy + canvas.height) / tileSize);

            for (let x = startX - 1; x <= endX; x++) {
                for (let y = startY - 1; y <= endY; y++) {
                    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                        this.tilemap[x][y].updateLighting();
                        let rgb = this.tilemap[x][y].color
                        ctx.fillStyle = rgb;
                        ctx.beginPath();
                        ctx.fillRect(x * tileSize - cx, y * tileSize - cy, tileSize, tileSize);
                        ctx.closePath();
                        //ctx.strokeRect(x * tileSize - cx, y * tileSize - cy, tileSize, tileSize);
                    } else {
                        ctx.fillStyle = 'blue';
                        ctx.beginPath();
                        ctx.rect(x * tileSize - camera.x, y * tileSize - camera.y, tileSize, tileSize);
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }

    }
    rectCollisionCheck(x, y, width, height) {
        let xStart = Math.round(x / tileSize - 5);
        let yStart = Math.round(y / tileSize - 5);
        let xEnd = Math.round(xStart + 10);
        let yEnd = Math.round(yStart + 10);
        let check = false;
        for (let i = xStart; i < xEnd; i++) {
            for (let j = yStart; j < yEnd; j++) {
                if (i > 0 && i < this.width && j > 0 && j < this.height) {
                    if (this.tilemap[i][j].collision) {
                        let rect1 = {
                            x: x - width/2,
                            y: y - height/2,
                            w: width,
                            h: height,
                        }
                        let rect2 = {
                            x: this.tilemap[i][j].x * tileSize,
                            y: this.tilemap[i][j].y * tileSize,
                            w: tileSize,
                            h: tileSize,
                        }
                        //axis aligned

                        if (rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x && rect1.y < rect2.y + rect2.h && rect1.h + rect1.y > rect2.y) {
                                // collision detected!
                            check = true;
                        } else {
                            // no collision
                            //console.log('col false')

                        }
                    }
                }
            }
        }
        console.log('colliding ' + check);
        return check;
    }

}

