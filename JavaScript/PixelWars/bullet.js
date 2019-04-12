function Bullet(mx, my, xor, yor, rangeB, damage, exSize, exDur, exCol, exDam, splat, speed, sd) {
	this.mx = mx;
	this.my = my;
	this.xor = xor;
	this.yor = yor;
	this.currentX = xor;
	this.currentY = yor;
	this.speed = speed;
	this.distance = dist(xor, yor, mx, my);
	this.moving = 0;
	this.xmov;
	this.ymov;
	this.rB = rangeB;
	this.dead = 0;
	this.damage = damage;
	this.explosionSize = exSize;
	this.explosionDuration = exDur;
	this.explosionColor = exCol;
	this.explosionDamage = exDam;
	this.splatter = splat;
	this.soundOnDead = sd;


	this.update = function () {
		this.move();
		this.draw();
		this.collision();
	}

	this.move = function () {
		if (this.moving === 0) {
			var op = this.my - this.yor;
			var hip = this.distance;
			var angle = asin(op / hip);
			this.ymov = sin(angle) * this.speed;
			this.xmov = cos(angle) * this.speed;

			if ((this.mx - this.xor) < 0) {
				this.xmov *= -1;
			}
			this.moving = 1;
		}
		this.currentX += this.xmov;
		this.currentY += this.ymov;
		if (dist(this.xor, this.yor, this.currentX, this.currentY) > this.rB) {
			this.dead = 1;
		}
	}

	this.draw = function () {
		push();
		translate(this.currentX, this.currentY)
		noStroke();
		fill(247, 255, 15);
		ellipse(0, 0, 5, 5);
		pop();
	}

	this.collision = function () {
		var tenem = level.getEnemies();
		for (var i = 0; i < tenem.length; i++) {
			if (tenem[i].isDead === 0) {
				if (collideRectCircle(tenem[i].x - tenem[i].offset, tenem[i].y - tenem[i].offset, tenem[i].size, tenem[i].size, this.currentX + 10, this.currentY + 10, 5, 5)) {
					tenem[i].hit(this.damage, 0);
					this.dead = 1;
				}
			}
		}
	}

}