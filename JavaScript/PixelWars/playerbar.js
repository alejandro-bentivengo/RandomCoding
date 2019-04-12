function PlayerBar() {
    this.x = 50;
    this.y = height - 50;
    this.width = width - this.x - 50;
    this.height = height;
    this.weapon;
    this.wx;
    this.wy;
    this.blocks = 50;
    this.wborder = 5;

    this.update = function (weapon) {
        this.weapon = weapon;
        this.detectWeapon();
        this.draw();
    }

    this.draw = function () {
        push();
        noStroke();
        fill(255, 255, 255, 100);
        rect(this.x, this.y, this.width, this.height);
        pop();
        this.drawGrayWeapons();

        //noStroke();
        //fill(0, 114, 255);
        //rect(this.wx, this.wy, this.blocks - this.wborder * 2, this.blocks - this.wborder * 2)
    }

    this.detectWeapon = function () {
        this.wx = (this.blocks * this.weapon) + this.wborder;
        this.wy = (this.y) + this.wborder;
    }

    this.drawGrayWeapons = function () {
        for (var i = 1; i < 7; i++) {
            var tintIt = false;
            if (i === this.weapon) {
                push();
                noFill();
                strokeWeight(5);
                stroke(255, 204, 100);
                rect(this.wx, this.wy, this.blocks - this.wborder * 2, this.blocks - this.wborder * 2);
                noStroke();
                strokeWeight(1);
                pop();
            }
            switch (i) {
                case 1:
                    image(pistolImage, ((i * this.blocks) + this.wborder - 2), (this.y + 2));
                    break;
                case 2:
                    image(shotgunImage, ((i * this.blocks) + this.wborder - 2), (this.y + 2));
                    break;
                case 3:
                    image(smgImage, ((i * this.blocks) + this.wborder - 2), (this.y + 2));
                    break;
                case 4:
                    image(sniperImage, ((i * this.blocks) + this.wborder - 2), (this.y + 2));
                    break;
                case 5:
                    image(akImage, ((i * this.blocks) + this.wborder - 2), (this.y + 2));
                    break;
                case 6:
                    image(grenadeImage, ((i * this.blocks) + this.wborder - 30), (this.y - 25));
                    break;
            }
            //fill(180, 180, 180);
            //rect((i * this.blocks) + this.wborder, this.y + this.wborder, this.blocks - this.wborder * 2, this.blocks - this.wborder * 2);
        }
    }

}