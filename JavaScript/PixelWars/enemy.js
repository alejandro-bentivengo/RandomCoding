function Enemy(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.strength = 1;
    this.size = 20;
    this.health = 7 * difficutly + level.levelC;
    this.isDead = 0;
    this.hitColorCD = 15;
    this.hitColor = 255;
    this.currentColor = color(floor(random(0, 255)), floor(random(0, 255)), this.hitColor);
    this.deadAnimationDone = false;
    this.dcolor = 255;
    this.blood = false;
    this.animationSpeed = random(1, 4);
    this.damageable = true;
    this.damageCD = 0.05 * 60;
    this.damageCounter = 0;
    this.expDamagable = true;
    this.expDamageCD = 1 * 60;
    this.expDamageCounter = 0;
    this.damage = (this.strength * 2 * difficutly) + (level.levelC / 10);
    this.rotationAn = 0;
    this.offset = this.size / 2;
    this.gold = ceil(random(5, 10));
    this.exp = 8;

    this.update = function () {
        if (this.health <= 0) {
            this.isDead = 1;
        }
        this.draw();
        if (this.isDead === 0) {
            this.updateDamageCD();
            if (!debug) {
                this.aiMovement();
            }
            this.collision();
        }
    }


    this.draw = function () {
        push();
        noStroke();
        translate(this.x - this.offset, this.y - this.offset);
        fill(this.currentColor);
        if (this.hitColor <= 255) {
            this.hitColor += this.hitColorCD;
            if (this.hitColor > 255) this.hitColor = 255;
            this.currentColor = color(red(this.currentColor), green(this.currentColor), this.hitColor);
        }
        if (this.isDead === 1) {
            if (this.dcolor >= 0) {
                if (this.dcolor < 0) this.dcolor = 0;
                this.dcolor -= this.animationSpeed;
                this.rotationAn = map(this.dcolor, 255, 0, 0, 90);
            } else {
                this.deadAnimationDone = true;
            }
            rotate(radians(this.rotationAn));
            fill(red(this.currentColor), green(this.currentColor), blue(this.currentColor), this.dcolor);
        }
        rect(0 - this.offset, 0 - this.offset, this.size, this.size);
        pop();
    }

    this.updateDamageCD = function () {
        if (!this.damageable) {
            if (this.damageCounter <= this.damageCD) {
                this.damageCounter++;
            } else {
                this.damageable = true;
                this.damageCounter = 0;
            }
        }
        if (!this.expDamagable) {
            if (this.expDamageCounter <= this.expDamageCD) {
                this.expDamageCounter++;
            } else {
                this.expDamagable = true;
                this.expDamageCounter = 0;
            }
        }
    }

    this.hit = function (dam, type) {
        if (this.isDead === 0) {
            var wasDamaged = false;
            switch (type) {
                case 0:
                    {
                        if (this.damageable) {
                            this.damageable = false;
                            wasDamaged = true;
                        }
                        break;
                    }
                case 1:
                    {
                        if (this.expDamagable) {
                            this.expDamagable = false;
                            wasDamaged = true;
                        }
                        break;
                    }
                default:
                    {
                        console.log("Error, wrong damage type received!");
                    }
            }
            if (wasDamaged) {
                this.health -= dam;
                bloodSpatter[bloodSpatter.length] = new Blood(this.x - this.offset, this.y - this.offset, color(255, 0, 0, 255), 5);
            }
        }
    }

    this.aiMovement = function () {
        var player = level.getPlayer();
        var currDistance = dist(this.x - this.offset, this.y - this.offset, player.x, player.y);
        var movX = 0;
        var movY = 0;
        if (currDistance < dist((this.x - this.offset) + 1, this.y - this.offset, player.x, player.y)) {
            movX -= this.speed;
        } else {
            movX += this.speed;
        }
        if (currDistance < dist(this.x - this.offset, (this.y - this.offset) + 1, player.x, player.y)) {
            movY -= this.speed;
        } else {
            movY += this.speed;
        }
        this.x += movX;
        this.y += movY;

    }

    this.collision = function () {
        var tp = level.getPlayer();
        if (tp.isDead === 0) {
            if (collideRectRect(tp.x - (tp.size / 2), tp.y - (tp.size / 2), tp.size, tp.size, this.x - (this.offset) - (this.offset), this.y - (this.offset) - (this.offset), this.size, this.size)) {
                tp.hit(this.damage, 0);
            }
            if (debug) {
                debugRect[debugRect.length] = new DebugRect(float(this.x - (this.offset) - (this.offset)), float(this.y - (this.offset) - (this.offset)), this.size, this.size);
            }
        }
    }

}