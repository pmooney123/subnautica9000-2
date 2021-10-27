class Player {
    constructor() {
        this.x = 500;
        this.y = 500;
        this.width = 20;
        this.height = 20;
        this.color = 'lime';
        this.speed = 1;
        this.light = 3;
    }
    update() {
        let spd = this.speed;
        let xspd = 0;
        let yspd = 0;
        this.light = Math.sin(gameFrame * .01) + 3;
        if (leftPressed && upPressed) {
            yspd = -1.0 * spd;
            xspd = -1.0 * spd;
        } else if (leftPressed && downPressed) {
            yspd = 1.0 * spd;
            xspd = -1.0 * spd;
        } else if (leftPressed) {
            xspd = -1 * spd;
        }

        if (rightPressed && upPressed) {
            yspd = -1.0 * spd;
            xspd = 1.0 * spd;
        } else if (rightPressed && downPressed) {
            yspd = 1.0 * spd;
            xspd = 1.0 * spd;
        } else if (rightPressed) {
            xspd = 1 * spd;
        }

        if (downPressed && !rightPressed && !leftPressed) {
            yspd = 1 * spd;
        }

        if (upPressed && !rightPressed && !leftPressed) {
            yspd = -1 * spd;
        }
        if (!map.rectCollisionCheck(this.x + xspd, this.y + yspd, this.width, this.height)) {


            this.color = 'pink';
            this.x += xspd;
            this.y += yspd;
        } else {
            if (!map.rectCollisionCheck(this.x, this.y + yspd, this.width, this.height)) {
                this.y += yspd;
            } else if (!map.rectCollisionCheck(this.x + xspd, this.y, this.width, this.height)) {
                this.x += xspd;
            }
            this.color = 'lime';
        }

    }

    cx() {
        return this.x;
    }
    cy() {
        return this.y;
    }

    draw(ctx, camera) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.x - camera.x - this.width/2, this.y - camera.y - this.height/2, this.width, this.height);
        ctx.fill();
    }
}