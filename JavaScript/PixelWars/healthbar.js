function HealthBar() {
    this.healthColor = color(49, 226, 94, 120);
    this.missingHealthColor = color(226, 49, 49, 120);
    this.x;
    this.y;
    this.xSize = 40;
    this.ySize = 10;
    this.healthColorX;

    this.update = function () {
        this.followPlayer();
        this.updateHB();
        this.draw();
    }

    this.draw = function () {
        push();
        fill(0, 0, 0, 120);
        rect(this.x - 2, this.y - 2, this.xSize + 2, this.ySize + 2);

        fill(this.missingHealthColor);
        rect(this.x - 1, this.y - 1, this.xSize, this.ySize)

        fill(this.healthColor);
        rect(this.x - 1, this.y - 1, this.healthColorX, this.ySize)

        pop();
    }

    this.followPlayer = function () {
        this.x = level.getPlayer().x - (this.xSize / 2);
        this.y = level.getPlayer().y + 20;
    }

    this.updateHB = function () {
        this.healthColorX = map(level.getPlayer().health, 0, level.getPlayer().maxHealth, 0, this.xSize);
    }

}