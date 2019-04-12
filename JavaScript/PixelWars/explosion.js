function Explosion(x, y, size, duration, color, damage) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.duration = duration;
	this.done = 0;
	this.color = color;
	this.damage = damage;

	this.update = function () {
		this.draw();
		this.newSize();
		this.collision();
	}

	this.draw = function () {
		fill(this.color);
		ellipse(this.x, this.y, this.size, this.size);
	}

	this.newSize = function () {
		if (this.size > 0) {
			this.size -= this.duration;
		} else {
			this.done = 1;
		}

	}

	this.collision = function () {
		if (this.damage > 0) {
			var tenem = level.getEnemies();
			for (var i = 0; i < tenem.length; i++) {
				if (collideRectCircle(tenem[i].x, tenem[i].y, tenem[i].size, tenem[i].size, this.x + 10, this.y + 10, this.size, this.size)) {
					tenem[i].hit(this.damage, 1);
					this.dead = 1;
				}
			}
		}
		if (collideRectCircle(level.getPlayer().x, level.getPlayer().y, level.getPlayer().size, level.getPlayer().size, this.x + 10, this.y + 10, this.size, this.size)) {
			level.getPlayer().hit(this.damage, 1);
			this.dead = 1;
		}
	}
}