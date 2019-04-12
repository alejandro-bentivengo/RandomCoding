function Level() {
    var enemies = [];
    var player = new Player();
    var coins = [];
    this.levelC = 1;
    this.enemiesAlive = 0;
    this.presentation = true;
    this.fadeIn = true;
    this.ct = 0;
    this.buyDialog = false;
    this.playerDialog = false;
    this.startLevel = false;
    this.mainMenu = true;

    this.keyCD = true;
    this.keyCounter = 0;
    this.keyCounterCD = 0.2 * 60;

    this.bootsBaseCost = 20;
    this.helmetBaseCost = 20;
    this.glovesBaseCost = 20;

    this.update = function () {
        this.updateBlood();
        this.updateBullets();
        this.bulletExplosions();
        player.update();
        this.updateEnemies();
        this.createLevel();
        this.checkEnemies();
        this.updateCoins();
        this.showGold();
    }

    this.showGold = function () {
        push();
        fill(color(255, 255, 0));
        textSize(30);
        var txt = player.gold;
        var txtWd = textWidth(txt);
        text(txt, (width / 2) - txtWd / 2, 30);
        pop();
    }

    this.getPlayer = function () {
        return player;
    }

    this.getEnemies = function () {
        return enemies;
    }

    this.bulletExplosions = function () {
        for (var i = 0; i < explosions.length; i++) {
            if (explosions[i].done === 1) {
                explosions.splice(i, 1);
            } else {
                explosions[i].update();
            }
        }
    }

    this.updateBullets = function () {
        for (var i = 0; i < bullets.length; i++) {
            if (bullets[i].dead === 1) {
                for (var j = 0; j < bullets[i].splatter; j++) {
                    explosions[explosions.length] = new Explosion(bullets[i].currentX + random(-5, 5), bullets[i].currentY + random(-5, 5), bullets[i].explosionSize, bullets[i].explosionDuration, bullets[i].explosionColor, bullets[i].explosionDamage);
                }
                if (bullets[i].soundOnDead != null) {
                    bullets[i].soundOnDead.play();
                }
                bullets.splice(i, 1);
            } else if (bullets[i].x > width || bullets[i].x < 0 || bullets[i].y > height || bullets[i].y < 0) {
                bullets.splice(i, 1);
            }
        }
        for (var i = 0; i < bullets.length; i++) {
            bullets[i].update();
        }
    }

    this.updateEnemies = function () {
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].update();
            if (enemies[i].isDead === 0) {

            } else {
                if (!enemies[i].blood) {
                    bloodSpatter[bloodSpatter.length] = new Blood(enemies[i].x - enemies[i].offset, enemies[i].y - enemies[i].offset / 2, color(255, 0, 0, 255), 40);
                    enemies[i].blood = true;
                    player.experience += enemies[i].exp;
                    player.gold += enemies[i].gold;
                    coins[coins.length] = new GoldSign(enemies[i].gold);
                }
                if (enemies[i].deadAnimationDone) {
                    enemies.splice(i, 1);
                }
            }
        }

    }

    this.updateCoins = function () {
        for (var i = 0; i < coins.length; i++) {
            if (!coins[i].animationDone) {
                coins[i].update();
            } else {
                coins.splice(i, 1);
            }
        }
    }

    this.updateBlood = function () {
        for (var i = 0; i < bloodSpatter.length; i++) {
            if (bloodSpatter[i].shouldDraw === 1) {
                bloodSpatter[i].update();
            } else {
                bloodSpatter.splice(i, 1);
            }
        }
    }

    this.createLevel = function () {
        if (!debug) {
            if (this.startLevel) {
                if (this.enemiesAlive === 0) {
                    if (this.presentation) {
                        if (this.fadeIn) {
                            this.ct += 2;
                            if (this.ct > 255) {
                                this.ct = 255;
                            }
                            if (this.ct === 255) {
                                this.fadeIn = false;
                            }
                        } else {
                            this.ct -= 2;
                            if (this.ct < 0) {
                                this.ct = 0;
                            }
                            if (this.ct === 0) {
                                this.fadeIn = true;
                                this.presentation = false;
                            }
                        }
                        noStroke();
                        fill(color(255, 0, 0, this.ct));
                        textSize(45);
                        var t = "Level " + this.levelC;
                        var wt = textWidth(t)
                        text(t, ((width / 2) - wt / 2), 100);
                    } else {
                        var mobCount = ceil(log(difficutly * sq(this.levelC + 1)));
                        for (var i = 0; i < mobCount; i++) {
                            var xpos = random(0, width);
                            var ypos = random(0, height);
                            //Spawn enemies in corners
                            if (width - xpos > height - ypos) {
                                if (xpos <= width) {
                                    xpos -= (width / 2) + 30;
                                } else {
                                    xpox += (width / 2) + 30;
                                }
                            } else {
                                if (ypos <= height) {
                                    ypos -= (height / 2) + 30;
                                } else {
                                    ypos += (height / 2) + 30;
                                }
                            }

                            enemies[enemies.length] = new Enemy(xpos, ypos);
                            console.log("Enemy spawned at X: " + xpos + " Y: " + ypos);
                        }
                        this.enemiesAlive = 1;
                    }

                }
            } else {
                this.menus();
            }
        } else {
            if (this.enemiesAlive === 0) {
                enemies[enemies.length] = new Enemy(width / 3, height / 3);
                this.enemiesAlive = 1;
            }
        }

    }

    this.menus = function () {
        this.detectKeyPressed();
        this.updateKeyCD();
        if (this.mainMenu) {
            this.drawMenus();
        } else if (this.buyDialog) {
            this.drawBuyDialog();
        } else if (this.playerDialog) {
            this.drawPlayerDialog();
        }
    }

    this.detectKeyPressed = function () {
        if (this.keyCD) {
            if (keyIsDown(66)) {
                //B
                this.keyCD = false;
                if (this.buyDialog) {
                    this.buyDialog = false;
                    this.mainMenu = true;
                } else {
                    this.buyDialog = true;
                    this.mainMenu = false;
                    this.playerDialog = false;
                }
            }
            if (keyIsDown(86)) {
                //V
                this.keyCD = false;
                if (this.playerDialog) {
                    this.playerDialog = false;
                    this.mainMenu = true;
                } else {
                    this.playerDialog = true;
                    this.mainMenu = false;
                    this.buyDialog = false;
                }
            }
        }
    }

    this.drawMenus = function () {
        //Line 1
        push();
        fill(color(0, 0, 0));
        textSize(15);
        var txt = "Press B to open the market";
        var txtWd = textWidth(txt);
        text(txt, (width / 2) - (txtWd / 2), 150);
        pop();

        //Line 2
        push();
        fill(color(0, 0, 0));
        textSize(15);
        var txt = "Press V to open the player";
        var txtWd = textWidth(txt);
        text(txt, (width / 2) - (txtWd / 2), 180);
        pop();

        var bwpos = width / 12;
        var bhpos = height / 12;

        if (collidePointRect(mouseX, mouseY, bwpos * 2, bhpos * 8 + 8, bwpos * 8, bhpos * 2 - 10)) {
            this.buttonColor = color(116, 188, 122);
        } else {
            this.buttonColor = color(47, 132, 54)
        }
        //Button draw
        fill(this.buttonColor);
        rect(bwpos * 2, bhpos * 8 + 8, bwpos * 8, bhpos * 2 - 10);

        //Button text
        push();
        fill(color(0, 0, 0));
        textSize(30);
        var txt = "Start Level " + this.levelC;
        var txtWd = textWidth(txt);
        text(txt, (width / 2) - (txtWd / 2), (bhpos * 8 + 8) + 40);
        pop();

        //Button-Mouse Collision
        if (this.keyCD) {
            if (mouseIsPressed) {
                if (collidePointRect(mouseX, mouseY, bwpos * 2, bhpos * 8 + 8, bwpos * 8, bhpos * 2 - 10)) {
                    this.startLevel = true;
                }
            }
        }
    }

    this.drawBuyDialog = function () {
        var wpos = width / 8;
        var hpos = height / 8;
        //Background (transparent)
        push();
        fill(color(0, 0, 0, 150));
        rect(wpos, hpos, wpos * 6, hpos * 6);
        pop();

        //Line 2
        push();
        fill(color(255, 50, 50));
        noStroke();
        textSize(25);
        var txt = "Welcome to the trader!";
        var txtWd = textWidth(txt);
        text(txt, (width / 2) - (txtWd / 2), 90);
        pop();

        push();
        fill(color(255, 50, 50));
        noStroke();
        textSize(20);
        var txt = "Boots";
        var txtWd = textWidth(txt);
        text(txt, wpos + 5, 130);
        pop();

        for (var i = 0; i < 10; i++) {
            push();
            if (player.boots <= i) {
                fill(color(120, 120, 120));
            } else {
                fill(color(55, 255, 48));
            }
            rect(wpos + txtWd + 30 + (14 * i), 120, 7, 7);
            pop();
        }

        for (var i = 0; i < 10; i++) {
            push();
            if (player.helmet <= i) {
                fill(color(120, 120, 120));
            } else {
                fill(color(55, 255, 48));
            }
            rect(wpos + txtWd + 30 + (14 * i), 150, 7, 7);
            pop();
        }

        for (var i = 0; i < 10; i++) {
            push();
            if (player.gloves <= i) {
                fill(color(120, 120, 120));
            } else {
                fill(color(55, 255, 48));
            }
            rect(wpos + txtWd + 30 + (14 * i), 180, 7, 7);
            pop();
        }

        push();
        fill(color(255, 50, 50));
        noStroke();
        textSize(20);
        var txt = "Helmet";
        var txtWd = textWidth(txt);
        text(txt, wpos + 5, 160);
        pop();

        push();
        fill(color(255, 50, 50));
        noStroke();
        textSize(20);
        var txt = "Gloves";
        var txtWd = textWidth(txt);
        text(txt, wpos + 5, 190);
        pop();

        if (player.boots < 10) {
            //Button Color change - Boots
            if (collidePointRect(mouseX, mouseY, wpos + 240, 110, 50, 25)) {
                this.buttonColor = color(116, 188, 122);
            } else {
                this.buttonColor = color(47, 132, 54)
            }
            //Button draw - Boots
            push();
            fill(this.buttonColor);
            rect(wpos + 240, 110, 50, 25);
            pop();
            //Button text - Boots
            push();
            noStroke();
            fill(color(255, 255, 0));
            textSize(15);
            var txt = this.bootsBaseCost + (sq(player.boots + 1));
            var txtWd = textWidth(txt);
            text(txt, (wpos + 265) - (txtWd / 2), 129);
            pop();
            //Button-Mouse Collision - Boots
            if (mouseIsPressed) {
                if (collidePointRect(mouseX, mouseY, wpos + 240, 110, 50, 25)) {
                    this.purchaseBoots();
                }
            }
        } else {
            //Button draw - Boots
            push();
            fill(color(119, 119, 119));
            rect(wpos + 240, 110, 50, 25);
            pop();
            //Button text - Boots
            push();
            noStroke();
            fill(color(255, 255, 0));
            textSize(15);
            var txt = "MAX";
            var txtWd = textWidth(txt);
            text(txt, (wpos + 265) - (txtWd / 2), 129);
            pop();
        }
        if (player.helmet < 10) {
            //Button Color change - Helmet
            if (collidePointRect(mouseX, mouseY, wpos + 240, 140, 50, 25)) {
                this.buttonColor = color(116, 188, 122);
            } else {
                this.buttonColor = color(47, 132, 54)
            }
            //Button draw - Helmet
            push();
            fill(this.buttonColor);
            rect(wpos + 240, 140, 50, 25);
            pop();
            //Button text - Helmet
            push();
            noStroke();
            fill(color(255, 255, 0));
            textSize(15);
            var txt = this.helmetBaseCost + (sq(player.helmet + 1));
            var txtWd = textWidth(txt);
            text(txt, (wpos + 265) - (txtWd / 2), 159);
            pop();
            //Button-Mouse Collision - Helmet
            if (mouseIsPressed) {
                if (collidePointRect(mouseX, mouseY, wpos + 240, 140, 50, 25)) {
                    this.purchaseHelmet();
                }
            }
        } else {
            //Button draw - Boots
            push();
            fill(color(119, 119, 119));
            rect(wpos + 240, 140, 50, 25);
            pop();
            //Button text - Boots
            push();
            noStroke();
            fill(color(255, 255, 0));
            textSize(15);
            var txt = "MAX";
            var txtWd = textWidth(txt);
            text(txt, (wpos + 265) - (txtWd / 2), 159);
            pop();
        }
        if (player.gloves < 10) {
            //Button Color change - Gloves
            if (collidePointRect(mouseX, mouseY, wpos + 240, 170, 50, 25)) {
                this.buttonColor = color(116, 188, 122);
            } else {
                this.buttonColor = color(47, 132, 54)
            }
            //Button draw - Gloves
            push();
            fill(this.buttonColor);
            rect(wpos + 240, 170, 50, 25);
            pop();

            //Button text - Gloves
            push();
            noStroke();
            fill(color(255, 255, 0));
            textSize(15);
            var txt = this.glovesBaseCost + (sq(player.gloves + 1));
            var txtWd = textWidth(txt);
            text(txt, (wpos + 265) - (txtWd / 2), 189);
            pop();

            //Button-Mouse Collision - Gloves
            if (mouseIsPressed) {
                if (collidePointRect(mouseX, mouseY, wpos + 240, 170, 50, 25)) {
                    this.purchaseGloves();
                }
            }

        } else {
            //Button draw - Boots
            push();
            fill(color(119, 119, 119));
            rect(wpos + 240, 170, 50, 25);
            pop();
            //Button text - Boots
            push();
            noStroke();
            fill(color(255, 255, 0));
            textSize(15);
            var txt = "MAX";
            var txtWd = textWidth(txt);
            text(txt, (wpos + 265) - (txtWd / 2), 189);
            pop();
        }

        push();
        fill(color(255, 50, 50));
        noStroke();
        textSize(17);
        var txt = "The boots improves your speed stat.";
        var txtWd = textWidth(txt);
        text(txt, wpos + 5, 225);
        pop();

        push();
        fill(color(255, 50, 50));
        noStroke();
        textSize(17);
        var txt = "The helmet improves your health stat.";
        var txtWd = textWidth(txt);
        text(txt, wpos + 5, 255);
        pop();

        push();
        fill(color(255, 50, 50));
        noStroke();
        textSize(17);
        var txt = "The gloves improves your accuracy.";
        var txtWd = textWidth(txt);
        text(txt, wpos + 5, 285);
        pop();

        if (collidePointRect(mouseX, mouseY, (width / 2) - 100, 295, 200, 50)) {
            this.buttonColor = color(116, 188, 122);
        } else {
            this.buttonColor = color(47, 132, 54)
        }
        //Button draw
        fill(this.buttonColor);
        rect((width / 2) - 100, 295, 200, 50);

        //Button text
        push();
        fill(color(0, 0, 0));
        textSize(30);
        var txt = "Back";
        var txtWd = textWidth(txt);
        text(txt, (((((width / 2) - 100) + ((width / 2) - 100) + 200)) / 2) - txtWd / 2, 295 + 34);
        pop();

        //Button-Mouse Collision
        if (mouseIsPressed) {
            if (collidePointRect(mouseX, mouseY, (width / 2) - 100, 295, 200, 50)) {
                this.playerDialog = false;
                this.buyDialog = false;
                this.mainMenu = true;
                this.keyCD = false;
                this.keyCounter = 0;
            }
        }
    }
    this.purchaseBoots = function () {
        if (this.keyCD) {
            if (player.gold >= this.bootsBaseCost + (sq(player.boots + 1))) {
                player.gold -= this.bootsBaseCost + (sq(player.boots + 1));
                player.boots++;
            }
            this.keyCD = false;
            this.keyCounter = 0;
        }
    }
    this.purchaseGloves = function () {
        if (this.keyCD) {
            if (player.gold >= this.glovesBaseCost + (sq(player.gloves + 1))) {
                player.gold -= this.glovesBaseCost + (sq(player.gloves + 1));
                player.gloves++;
            }
            this.keyCD = false;
            this.keyCounter = 0;
        }
    }
    this.purchaseHelmet = function () {
        if (this.keyCD) {
            if (player.gold >= this.helmetBaseCost + (sq(player.helmet + 1))) {
                player.gold -= this.helmetBaseCost + (sq(player.helmet + 1));
                player.helmet++;
            }
            this.keyCD = false;
            this.keyCounter = 0;
        }
    }
    this.drawPlayerDialog = function () {
        var wpos = width / 8;
        var hpos = height / 8;
        //Background (transparent)
        push();
        fill(color(0, 0, 0, 150));
        rect(wpos, hpos, wpos * 6, hpos * 6);
        var wposMed = (wpos + (wpos * 6)) / 2;

        //Line 2
        push();
        fill(color(255, 50, 50));
        noStroke();
        textSize(25);
        var txt = "Available points: " + player.skillPoints;
        var txtWd = textWidth(txt);
        text(txt, (width / 2) - (txtWd / 2), 90);
        pop();

        push();
        fill(color(255, 50, 50));
        noStroke();
        textSize(20);
        var txt = "Dexterity";
        var txtWd = textWidth(txt);
        text(txt, wpos + 5, 130);
        pop();

        for (var i = 0; i < 10; i++) {
            push();
            if (player.dexterity <= i) {
                fill(color(120, 120, 120));
            } else {
                fill(color(55, 255, 48));
            }
            rect(wpos + txtWd + 35 + (14 * i), 120, 7, 7);
            pop();
        }

        for (var i = 0; i < 10; i++) {
            push();
            if (player.constitution <= i) {
                fill(color(120, 120, 120));
            } else {
                fill(color(55, 255, 48));
            }
            rect(wpos + txtWd + 35 + (14 * i), 150, 7, 7);
            pop();
        }

        for (var i = 0; i < 10; i++) {
            push();
            if (player.agility <= i) {
                fill(color(120, 120, 120));
            } else {
                fill(color(55, 255, 48));
            }
            rect(wpos + txtWd + 35 + (14 * i), 180, 7, 7);
            pop();
        }

        push();
        fill(color(255, 50, 50));
        noStroke();
        textSize(20);
        var txt = "Constitution";
        var txtWd = textWidth(txt);
        text(txt, wpos + 5, 160);
        pop();

        push();
        fill(color(255, 50, 50));
        noStroke();
        textSize(20);
        var txt = "Agility";
        var txtWd = textWidth(txt);
        text(txt, wpos + 5, 190);
        pop();

        if (player.dexterity < 10) {
            //Button Color change - Dex
            if (collidePointRect(mouseX, mouseY, wpos + 252, 110, 25, 25)) {
                this.buttonColor = color(116, 188, 122);
            } else {
                this.buttonColor = color(47, 132, 54)
            }
            //Button draw - Dex
            push();
            fill(this.buttonColor);
            rect(wpos + 252, 110, 25, 25);
            pop();
            //Button text - Dex
            push();
            noStroke();
            fill(color(255, 255, 0));
            textSize(15);
            text("+", wpos + 261, 129);
            pop();
            //Button-Mouse Collision - Dex
            if (mouseIsPressed) {
                if (collidePointRect(mouseX, mouseY, wpos + 252, 110, 25, 25)) {
                    this.upgradeDex();
                }
            }
        } else {
            //Button draw - Dex
            push();
            fill(color(119, 119, 119));
            rect(wpos + 252, 110, 25, 25);
            pop();
            //Button text - Dex
            push();
            noStroke();
            fill(color(255, 255, 0));
            textSize(15);
            text("+", wpos + 261, 129);
            pop();
        }
        if (player.constitution < 10) {
            //Button Color change - Cons
            if (collidePointRect(mouseX, mouseY, wpos + 252, 140, 25, 25)) {
                this.buttonColor = color(116, 188, 122);
            } else {
                this.buttonColor = color(47, 132, 54)
            }
            //Button draw - Cons
            push();
            fill(this.buttonColor);
            rect(wpos + 252, 140, 25, 25);
            pop();
            //Button text - Cons
            push();
            noStroke();
            fill(color(255, 255, 0));
            textSize(15);
            text("+", wpos + 261, 159);
            pop();
            //Button-Mouse Collision - Cons
            if (mouseIsPressed) {
                if (collidePointRect(mouseX, mouseY, wpos + 252, 140, 25, 25)) {
                    this.upgradeCos();
                }
            }
        } else {
            //Button draw - Cons
            push();
            fill(color(119, 119, 119));
            rect(wpos + 252, 140, 25, 25);
            pop();
            //Button text - Cons
            push();
            noStroke();
            fill(color(255, 255, 0));
            textSize(15);
            var txt = "+";
            var txtWd = textWidth(txt);
            text(txt, (wpos + 261) - (txtWd / 2), 159);
            pop();
        }
        if (player.agility < 10) {
            //Button Color change - Agi
            if (collidePointRect(mouseX, mouseY, wpos + 252, 170, 25, 25)) {
                this.buttonColor = color(116, 188, 122);
            } else {
                this.buttonColor = color(47, 132, 54)
            }
            //Button draw - Agi
            push();
            fill(this.buttonColor);
            rect(wpos + 252, 170, 25, 25);
            pop();

            //Button text - Agi
            push();
            noStroke();
            fill(color(255, 255, 0));
            textSize(15);
            text("+", wpos + 261, 189);
            pop();

            //Button-Mouse Collision - Agi
            if (mouseIsPressed) {
                if (collidePointRect(mouseX, mouseY, wpos + 252, 170, 25, 25)) {
                    this.upgradeAgi();
                }
            }

        } else {
            //Button draw - Agi
            push();
            fill(color(119, 119, 119));
            rect(wpos + 252, 170, 25, 25);
            pop();
            //Button text - Agi
            push();
            noStroke();
            fill(color(255, 255, 0));
            textSize(15);
            var txt = "+";
            var txtWd = textWidth(txt);
            text(txt, (wpos + 261) - (txtWd / 2), 189);
            pop();
        }

        push();
        fill(color(255, 50, 50));
        noStroke();
        textSize(17);
        var txt = "Dex improves aiming.";
        var txtWd = textWidth(txt);
        text(txt, wpos + 5, 225);
        pop();

        push();
        fill(color(255, 50, 50));
        noStroke();
        textSize(17);
        var txt = "Cons improves health.";
        var txtWd = textWidth(txt);
        text(txt, wpos + 5, 255);
        pop();

        push();
        fill(color(255, 50, 50));
        noStroke();
        textSize(17);
        var txt = "Agi improves running.";
        var txtWd = textWidth(txt);
        text(txt, wpos + 5, 285);
        pop();

        if (collidePointRect(mouseX, mouseY, (width / 2) - 100, 295, 200, 50)) {
            this.buttonColor = color(116, 188, 122);
        } else {
            this.buttonColor = color(47, 132, 54)
        }
        //Button draw
        fill(this.buttonColor);
        rect((width / 2) - 100, 295, 200, 50);

        //Button text
        push();
        fill(color(0, 0, 0));
        textSize(30);
        var txt = "Back";
        var txtWd = textWidth(txt);
        text(txt, (((((width / 2) - 100) + ((width / 2) - 100) + 200)) / 2) - txtWd / 2, 295 + 34);
        pop();

        //Button-Mouse Collision
        if (mouseIsPressed) {
            if (collidePointRect(mouseX, mouseY, (width / 2) - 100, 295, 200, 50)) {
                this.playerDialog = false;
                this.buyDialog = false;
                this.mainMenu = true;
                this.keyCD = false;
                this.keyCounter = 0;
            }
        }

        pop();
    }

    this.upgradeDex = function () {
        if (this.keyCD) {
            if (player.skillPoints > 1) {
                player.skillPoints--;
                player.dexterity++;
            }
            this.keyCD = false;
            this.keyCounter = 0;
        }
    }

    this.upgradeCos = function () {
        if (this.keyCD) {
            if (player.skillPoints > 1) {
                player.skillPoints--;
                player.constitution++;
            }
            this.keyCD = false;
            this.keyCounter = 0;
        }
    }

    this.upgradeAgi = function () {
        if (this.keyCD) {
            if (player.skillPoints > 1) {
                player.skillPoints--;
                player.agility++;
            }
            this.keyCD = false;
            this.keyCounter = 0;
        }
    }

    this.updateKeyCD = function () {
        if (!this.keyCD) {
            if (this.keyCounter < this.keyCounterCD) {
                this.keyCounter++;
            } else {
                this.keyCD = true;
                this.keyCounter = 0;
            }
        }
    }

    this.checkEnemies = function () {
        if (this.enemiesAlive === 1) {
            if (enemies.length === 0) {
                this.presentation = true;
                this.startLevel = false;
                this.enemiesAlive = 0;
                this.levelC++;
            }
        }
    }

}