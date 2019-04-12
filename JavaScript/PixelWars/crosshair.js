function Crosshair() {
	this.playerDistance = 50;
	this.x;
	this.y;
	this.distance;
	this.crosshairSize = 5;

	this.update = function (px, py) {
		this.x = px;
		this.y = py;
		this.distance = dist(this.x, this.y, mouseX, mouseY)
		this.position();
		this.draw();
	}

	this.position = function () {
		var op = mouseY - this.y;
		var hip = this.distance;
		var angle = asin(op / hip);
		var ypos = (sin(angle)) * this.playerDistance;
		var xpos = (cos(angle)) * this.playerDistance;
		if ((mouseX - this.x) < 0) {
			xpos *= -1;
		}
		this.x += xpos;
		this.y += ypos;
	}

	this.draw = function () {
		stroke(0);
		fill(color(0, 0, 0, 0));
		ellipse(this.x, this.y, this.crosshairSize, this.crosshairSize);

	}

	this.getX = function () {
		return this.x;
	}

	this.getY = function () {
		return this.y;
	}
}