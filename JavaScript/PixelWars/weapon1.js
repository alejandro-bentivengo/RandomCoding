function Weapon1() {
	//Pistol
	this.damage = 2;
	this.range = 200;
	this.explosionSize = 5;
	this.explosionDuration = 10;
	this.explosionColor = color(255, 255, 0);
	this.explosionDamage = 0;
	this.fireable = true;
	this.splatter = 5;
	this.bulletCount = 1;
	this.id = 1;
	this.coolDown = 1 * 60;
	this.cdCounter = 0;
	this.spread = 2;
	this.bulletSpeed = 4;

	this.update = function () {
		this.updateSpread();
		this.updateCooldown();
	}

	this.updateSpread = function () {
		this.spread = (2 - ((level.getPlayer().gloves / 20) - (level.getPlayer().dexterity / 20)));
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
			pistolSound.play();
			for (var i = 0; i < this.bulletCount; i++) {
				bullets[bullets.length] = new Bullet(cx + random(-this.spread, this.spread), cy + random(-this.spread, this.spread), xx, yy, this.range, this.damage, this.explosionSize, this.explosionDuration, this.explosionColor, this.explosionDamage, this.splatter, this.bulletSpeed, null);
			}
			this.fireable = false;
		}
	}

	this.getId = function () {
		return this.id;
	}
}