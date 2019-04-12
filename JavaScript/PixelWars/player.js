function Player() {

	this.experience = 0;
	this.playerLevel = 1;
	this.nextLevel = 20 * (this.playerLevel);
	this.skillPoints = 0;

	this.gold = 50;

	this.dexterity = 0;
	this.constitution = 0;
	this.agility = 0;

	this.stamina = 80;
	this.maxStamina = 80 + (this.agility * 1) + (this.boots * 1);
	this.staminaRegen = 0.24 + (this.agility / 25) + (this.boots / 25);
	this.staminaRegenDelay = 1 * 60;
	this.staminaRegenCounter = 0;

	this.health = 40;
	this.maxHealth = 40 + (this.constitution * 1) + (this.helmet * 1);
	this.healthRegen = 0.08 + (this.constitution / 100) + (this.helmet / 100);
	this.healthRegenDelay = 1 * 60;
	this.healthRegenCounter = 0;
	this.healthRegenHit = false;

	this.speed = 1.2 + (this.agility / 10) + (this.boots / 10);

	this.x = width / 2;
	this.y = height / 2;
	this.crosshair = new Crosshair();
	this.size = 10;
	this.isDead = 0;

	this.hpbar = new HealthBar();
	this.stabar = new StaminaBar();
	this.expbar = new ExperienceBar();

	this.weapon1 = new Weapon1();
	this.weapon2 = new Weapon2();
	this.weapon3 = new Weapon3();
	this.weapon4 = new Weapon4();
	this.weapon5 = new Weapon5();
	this.weapon6 = new Weapon6();

	this.weapon = this.weapon1;

	this.damageable = true;
	this.damageCD = 0.07 * 60;
	this.damageCounter = 0;
	this.expDamagable = true;
	this.expDamageCD = 1 * 60;
	this.expDamageCounter = 0;

	this.isMoving = false;

	this.gloves = 0;
	this.helmet = 0;
	this.boots = 0;


	this.update = function () {
		if (this.health <= 0) {
			this.isDead = 1;
		}

		if (this.isDead === 0) {
			this.show();
			this.move();
			this.drawLine();
			this.weapon.update();
			this.crosshair.update(this.x, this.y);
			this.statRegeneration();
			this.checkLevel();
			this.updateStats();
		}
		this.hpbar.update();
		this.stabar.update();
		this.expbar.update();
		this.updateDamageCD();
	}

	this.updateStats = function () {
		this.maxStamina = 80 + (this.agility * 1) + (this.boots * 1);
		this.staminaRegen = 0.24 + (this.agility / 25) + (this.boots / 25);
		this.speed = 1.2 + (this.agility / 10) + (this.boots / 10);
		this.maxHealth = 40 + (this.constitution * 1) + (this.helmet * 1);
		this.healthRegen = 0.08 + (this.constitution / 100) + (this.helmet / 100);
		console.log(this.speed);
	}

	this.checkLevel = function () {
		if (this.experience >= this.nextLevel) {
			var extra = this.experience - this.nextLevel;
			this.playerLevel++;
			this.nextLevel = 20 * (this.playerLevel);
			this.experience = 0 + extra;
			this.skillPoints++;
		}
	}

	this.statRegeneration = function () {
		if (this.health < this.maxHealth) {
			if (this.healthRegenCounter < this.healthRegenDelay) {
				this.healthRegenCounter++;
			} else {
				this.health += this.healthRegen;
				if (this.health > this.maxHealth) {
					this.health = this.maxHealth;
				}
			}
		}
		if (this.stamina < this.maxStamina) {
			if (this.staminaRegenCounter < this.staminaRegenDelay) {
				this.staminaRegenCounter++;
			} else {
				this.stamina += this.staminaRegen;
				if (this.stamina > this.maxStamina) {
					this.stamina = this.maxStamina;
				}
			}
		}

	}

	this.move = function () {
		if (this.stamina > 0) {
			if (keyIsDown(SHIFT)) {
				this.speed = (1.2 + (this.agility / 10) + (this.boots / 10)) * 2;
				if (this.isMoving) {
					this.stamina -= (1 - ((this.agility / 25) + (this.boots / 25)));
					this.staminaRegenCounter = 0;
				}
			} else {
				this.speed = 1.2 + (this.agility / 10) + (this.boots / 10);
			}
		} else {
			this.speed = 1.2 + (this.agility / 10) + (this.boots / 10);
		}
		var ymov = 0;
		var xmov = 0;
		if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
			if (this.y >= 0) {
				ymov -= this.speed;
			}
		}
		if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
			if (this.y < height) {
				ymov += this.speed;
			}
		}
		if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
			if (this.x >= 0) {
				xmov -= this.speed;
			}
		}
		if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
			if (this.x < width) {
				xmov += this.speed;
			}
		}
		if (xmov != 0 || ymov != 0) {
			this.x += xmov;
			this.y += ymov;
			this.isMoving = true;
		} else {
			this.isMoving = false;
		}

		if (keyIsDown(49)) {
			this.swapWeapon(1);
		}
		if (keyIsDown(50)) {
			this.swapWeapon(2);
		}
		if (keyIsDown(51)) {
			this.swapWeapon(3);
		}
		if (keyIsDown(52)) {
			this.swapWeapon(4);
		}
		if (keyIsDown(53)) {
			this.swapWeapon(5);
		}
		if (keyIsDown(54)) {
			this.swapWeapon(6);
		}
	}

	this.show = function () {
		fill(0);
		noStroke();
		rect(this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size);
	}

	this.drawLine = function () {
		if (mouseIsPressed) {
			if (mouseButton === LEFT) {
				this.weapon.fire(this.x, this.y, this.crosshair.getX(), this.crosshair.getY());
			}
		}
	}

	this.getSelectedWeapon = function () {
		return this.weapon.getId();
	}

	this.swapWeapon = function (weap) {
		switch (weap) {
			case 1:
				this.weapon = this.weapon1;
				break;
			case 2:
				this.weapon = this.weapon2;
				break;
			case 3:
				this.weapon = this.weapon3;
				break;
			case 4:
				this.weapon = this.weapon4;
				break;
			case 5:
				this.weapon = this.weapon5;
				break;
			case 6:
				this.weapon = this.weapon6;
				break;
		}

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
				this.healthRegenCounter = 0;
				this.health -= dam;
				bloodSpatter[bloodSpatter.length] = new Blood(this.x, this.y, color(255, 0, 0, 255), 5);
			}
		}
	}

}