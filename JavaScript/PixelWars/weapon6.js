function Weapon6() {
	//Grenade
	this.damage = 0;
	this.range = 100;
	this.explosionSize = 50;
	this.explosionDuration = 10;
	this.explosionColor = color(255, 136, 50);
	this.explosionDamage = 10;
	this.fireable = true;
	this.splatter = 5;
	this.bulletCount = 1;
	this.id = 6;
	this.coolDown = 4 * 60;
	this.cdCounter = 0;
	this.spread = 5;
	this.bulletSpeed = 5;

	this.update = function () {
		this.updateSpread();
		this.updateCooldown();
	}

	this.updateSpread = function () {
		this.spread = (5 - ((level.getPlayer().gloves / 20) - (level.getPlayer().dexterity / 20)));
	}

	this.updateCooldown = function () {
		if (!this.fireable) {
			if (this.cdCounter <= this.coolDown) {
				this.cdCounter++;
			} else {
				this.fireable = true;
				this.cdCounter = 0;
			}
		}
	}

	this.fire = function (xx, yy, cx, cy) {
		if (this.fireable) {
			for (var i = 0; i < this.bulletCount; i++) {
				bullets[bullets.length] = new Bullet(cx + random(-this.spread, this.spread), cy + random(-this.spread, this.spread), xx, yy, this.range, this.damage, this.explosionSize, this.explosionDuration, this.explosionColor, this.explosionDamage, this.splatter, this.bulletSpeed, grenadeSound);
			}
			this.fireable = false;
		}
	}

	this.getId = function () {
		return this.id;
	}
}