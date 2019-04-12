function Blood(xpos, ypos, col, radius) {
    this.x = xpos;
    this.y = ypos;
    this.col = col;
    this.duration = random(0.4, 2);
    this.radius = radius;
    this.shouldDraw = 1;
    this.disolve = 255;
    this.appearAnim = false;
    this.bloodSpeed = random(0.1, 1);
    this.currentRadius = 0;

    this.update = function () {
        this.draw();
        if (this.disolve === 0) {
            this.shouldDraw = 0;
        }
    }

    this.draw = function () {
        if (!this.appearAnim) {
            if (this.currentRadius <= this.radius) {
                this.currentRadius += this.bloodSpeed;
            } else {
                this.appearAnim = true;
            }
        } else {
            if (this.disolve <= 255) {
                this.disolve -= this.duration;
                if (this.disolve < 0) {
                    this.disolve = 0;
                }
                var r = red(this.col);
                var g = green(this.col);
                var b = blue(this.col);
                this.col = color(int(r), int(g), int(b), int(this.disolve));
            }
        }
        fill(this.col);
        ellipse(this.x, this.y, this.currentRadius, this.currentRadius);

    }


}