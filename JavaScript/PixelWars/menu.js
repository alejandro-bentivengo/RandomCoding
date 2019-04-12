function Menu() {
    this.start = 0;
    this.buttonColor = color(47, 132, 54);
    this.aboutDialog = false;

    this.update = function () {
        if (!this.aboutDialog) {
            this.draw();
        } else {
            this.showAboutDialog();
        }
    }

    this.draw = function () {
        var wpos = width / 8;
        var hpos = height / 8;
        //Background (transparent)
        fill(color(0, 0, 0, 150));
        rect(wpos, hpos, wpos * 6, hpos * 6);
        var wposMed = (wpos + (wpos * 6)) / 2;
        //Title
        fill(color(255, 0, 0));
        textSize(45);
        text("Pixel Wars", wposMed / 2 + 5, 100);
        //Buttons
        var bwpos = width / 12;
        var bhpos = height / 12;
        //collision and color change
        if (collidePointRect(mouseX, mouseY, bwpos * 2, bhpos * 3 + 30, bwpos * 8, bhpos * 2 - 10)) {
            this.buttonColor = color(116, 188, 122);
        } else {
            this.buttonColor = color(47, 132, 54)
        }

        fill(this.buttonColor);
        rect(bwpos * 2, bhpos * 3 + 30, bwpos * 8, bhpos * 2 - 10);
        //collision and color change
        if (collidePointRect(mouseX, mouseY, bwpos * 2, bhpos * 5 + 30, bwpos * 8, bhpos * 2 - 10)) {
            this.buttonColor = color(116, 188, 122);
        } else {
            this.buttonColor = color(47, 132, 54)
        }

        fill(this.buttonColor);
        rect(bwpos * 2, bhpos * 5 + 30, bwpos * 8, bhpos * 2 - 10);
        //Button Text
        var tbwpos = (bwpos * 2 + bwpos * 8) / 2;

        fill(color(255, 255, 255));
        textSize(35);
        text("Start Game", tbwpos / 2 + 25, 170);

        fill(color(255, 255, 255));
        textSize(35);
        text("About", tbwpos / 2 + 70, 238);

        if (!this.aboutDialog) {
            if (mouseIsPressed) {
                if (collidePointRect(mouseX, mouseY, bwpos * 2, bhpos * 3 + 30, bwpos * 8, bhpos * 2 - 10)) {
                    this.start = 1;
                }
                if (collidePointRect(mouseX, mouseY, bwpos * 2, bhpos * 5 + 30, bwpos * 8, bhpos * 2 - 10)) {
                    this.aboutDialog = true;
                }
            }
        }
    }


    this.showAboutDialog = function () {
        var wpos = width / 8;
        var hpos = height / 8;
        push();
        stroke(255, 138, 61);
        strokeWeight(4);
        fill(color(61, 135, 255));
        rect(wpos, hpos, wpos * 6, hpos * 6);
        var wposMed = (wpos + (wpos * 6)) / 2;
        pop();

        //Title
        push();
        fill(color(255, 0, 0));
        textSize(45);
        var txt = "About";
        var txtWd = textWidth(txt);
        text(txt, (width / 2) - (txtWd / 2), 100);
        pop();

        //Line 1
        push();
        fill(color(0, 0, 0));
        textSize(15);
        var txt = "This is the first game I have ever developed";
        var txtWd = textWidth(txt);
        text(txt, (width / 2) - (txtWd / 2), 150);
        pop();

        //Line 2
        push();
        fill(color(0, 0, 0));
        textSize(15);
        var txt = "hence be aware that bugs might exist.";
        var txtWd = textWidth(txt);
        text(txt, (width / 2) - (txtWd / 2), 170);
        pop();

        //Line 3
        push();
        fill(color(0, 0, 0));
        textSize(15);
        var txt = "This game is licenced under GNU, if you";
        var txtWd = textWidth(txt);
        text(txt, (width / 2) - (txtWd / 2), 190);
        pop();

        //Line 4
        push();
        fill(color(0, 0, 0));
        textSize(15);
        var txt = "are planning on reusing part of the code";
        var txtWd = textWidth(txt);
        text(txt, (width / 2) - (txtWd / 2), 210);
        pop();

        //Line 5
        push();
        fill(color(0, 0, 0));
        textSize(15);
        var txt = "please do so responsibly.";
        var txtWd = textWidth(txt);
        text(txt, (width / 2) - (txtWd / 2), 230);
        pop();

        //Line 6
        push();
        fill(color(0, 0, 0));
        textSize(15);
        var txt = "Big thanks to the p5js and processing team!";
        var txtWd = textWidth(txt);
        text(txt, (width / 2) - (txtWd / 2), 255);
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
        var txt = "Back";
        var txtWd = textWidth(txt);
        text(txt, (width / 2) - (txtWd / 2), (bhpos * 8 + 8) + 40);
        pop();

        //Button-Mouse Collision
        if (mouseIsPressed) {
            if (collidePointRect(mouseX, mouseY, bwpos * 2, bhpos * 8 + 8, bwpos * 8, bhpos * 2 - 10)) {
                this.aboutDialog = false;
            }
        }
    }

}