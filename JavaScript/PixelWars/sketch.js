var level;
var playerBar;
var explosions = [];
var bullets = [];
var frames = 0;
var framerate = 0;
var bloodSpatter = [];
var difficutly = 1;
var menu;
var pause = false;
var pt = 0;
var shouldRun = true;
var bgImage;
var pistolImage;
var smgImage;
var shotgunImage;
var sniperImage;
var akImage;
var grenadeImage;
var debug = false;
var debugRect = [];

var pistolSound;
var smgSound;
var shotgunSound;
var sniperSound;
var akSound;
var ak2Sound;
var grenadeSound;

var sWheelCD = 0.2 * 60;
var sWheelCounter = 0;
var canSWheel = true;

function setup() {
	createCanvas(400, 400, P2D);
	cursor('assets/cursors.png', 8, 8);
	frameRate(60);

	loadResources(function () {
		//Create Level
		level = new Level();
		playerBar = new PlayerBar();
		menu = new Menu();
		document.addEventListener('contextmenu', event => event.preventDefault());
	});

}

function loadResources(cbdone) {
	//Load Images
	bgImage = loadImage('assets/field.png');
	pistolImage = loadImage('assets/pistolhr.png', function (pistolImage) {
		pistolImage.resize(45, 45);
	});

	smgImage = loadImage('assets/mghr.png', function (smgImage) {
		smgImage.resize(45, 45);
	});

	shotgunImage = loadImage('assets/shotgunhr.png', function (shotgunImage) {
		shotgunImage.resize(45, 45);
	});

	sniperImage = loadImage('assets/sniperhr.png', function (sniperImage) {
		sniperImage.resize(45, 45);
	});


	akImage = loadImage('assets/akhr.png', function (akImage) {
		akImage.resize(45, 45);
	});


	grenadeImage = loadImage('assets/grenadehr.png', function (grenadeImage) {
		grenadeImage.resize(100, 100);
	});

	//Load Sounds
	pistolSound = loadSound('assets/pistol.mp3', function (pistolSound) {
		pistolSound.setVolume(0.1);
	});

	//smgSound = loadSound('assets/mghr.png');

	shotgunSound = loadSound('assets/shotgun.mp3', function (shotgunSound) {
		shotgunSound.setVolume(0.1);
	});

	//sniperSound = loadSound('');

	akSound = loadSound('assets/ak.mp3', function (akSound) {
		akSound.setVolume(0.1)
	});

	ak2Sound = loadSound('assets/ak2.mp3', function (ak2Sound) {
		ak2Sound.setVolume(0.1)
	});

	grenadeSound = loadSound('assets/grenade.mp3', function (grenadeSound) {
		grenadeSound.setVolume(0.1);
	});

	cbdone();
}

function draw() {
	background(bgImage);
	if (menu.start === 0) {
		menu.update();
	} else {
		if (pause) {
			fill(0);
			textSize(50);
			text("GAME PAUSED", 17, 200);
		} else {
			level.update();
			playerBar.update(level.getPlayer().getSelectedWeapon());
		}
	}

	if (pt >= 60) {
		shouldRun = true;
		pt = 0;
	} else {
		pt++;
	}

	showDebugData();

	if (debugRect.length > 0) {
		for (var i = 0; i < debugRect.length; i++) {
			push();
			strokeWeight(2);
			stroke(255, 0, 255);
			noFill();
			rect(debugRect[i].x, debugRect[i].y, debugRect[i].width, debugRect[i].height);
			debugRect.splice(i, 1);
			pop();
		}
	}
	updateSWheelCD();

}

function updateSWheelCD() {
	if (!canSWheel) {
		if (sWheelCounter < sWheelCD) {
			sWheelCounter++;
		} else {
			sWheelCounter = 0;
			canSWheel = true;
		}
	}
}

function keyPressed() {
	if (keyCode === 27) {
		if (shouldRun) {
			if (pause) {
				pause = false;
			} else {
				pause = true;
			}
		}
	}
}

function showDebugData() {
	noStroke();
	fill(0);
	textSize(15);
	text("X: " + round(level.getPlayer().x) + " Y: " + round(level.getPlayer().y), 10, 20);
	if (frames === 60) {
		framerate = round(frameRate());
		frames = 0;
	} else {
		frames += 1;
	}
	fill(0);
	textSize(15);
	noStroke();
	text("FPS: " + framerate, width - 80, 20);
}

function mouseWheel(event) {
	if (canSWheel) {
		var cw = level.getPlayer().getSelectedWeapon();
		switch (event.delta) {
			case 100:
				{
					cw++;
					level.getPlayer().swapWeapon(cw);
					break;
				}
			case -100:
				{
					cw--;
					level.getPlayer().swapWeapon(cw);
					break;
				}
		}
	}
}