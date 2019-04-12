function GoldSign(ammount) {
    this.x;
    this.y;
    this.xSize = 10;
    this.ySize = 10;
    this.healthColorX;
    this.animateSpeed = 1;
    this.animateCD = 1 * 60;
    this.animateCounter = 0;
    this.animationDone = false;
    this.alphaAnimationColor = 255;
    this.signColor = color(249, 252, 98, this.alphaAnimationColor);
    this.ammount = ammount;
    this.shouldMove = true;
    this.animationOffset = 0;

    this.update = function () {
        this.followPlayer();
        this.draw();
        this.moveSign();
    }

    this.draw = function () {
        this.signColor = color(249, 252, 98, this.alphaAnimationColor);

        push();
        noStroke();
        fill(this.signColor);
        textSize(15);
        var txt = "+" + this.ammount;
        var txtWd = textWidth(txt);
        text(txt, this.x - (txtWd / 2), this.y - 10);
        pop();

        push();
        noStroke();
        fill(this.signColor);
        ellipse(this.x, this.y - 2, this.xSize, this.ySize);
        pop();
        if (this.animateCounter <= this.animateCD) {
            this.animateCounter++;
        } else {
            this.shouldMove = true;
        }

    }

    this.moveSign = function () {
        if (this.shouldMove) {
            this.alphaAnimationColor--;
            if (this.alphaAnimationColor <= 0) {
                this.animationDone = true;
            } else {
                this.animationOffset = map(this.alphaAnimationColor, 255, 0, 0, -20);

            }
        }
    }

    this.followPlayer = function () {
        this.x = level.getPlayer().x;
        this.y = level.getPlayer().y - 20 + this.animationOffset;
    }

}