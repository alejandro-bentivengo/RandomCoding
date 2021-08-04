class Ant {
    constructor(posx, posy, orientation) {
        this.posx = posx;
        this.posy = posy;
        this.orientation = orientation;
    }

    turnLeft() {
        switch (this.orientation) {
            case ORIENTATIONS.WEST:
                this.orientation = ORIENTATIONS.SOUTH;
                break;
            case ORIENTATIONS.EAST:
                this.orientation = ORIENTATIONS.NORTH;
                break;
            case ORIENTATIONS.NORTH:
                this.orientation = ORIENTATIONS.WEST;
                break;
            case ORIENTATIONS.SOUTH:
                this.orientation = ORIENTATIONS.EAST;
                break;
        }
    }

    turnRight() {
        switch (this.orientation) {
            case ORIENTATIONS.WEST:
                this.orientation = ORIENTATIONS.NORTH;
                break;
            case ORIENTATIONS.EAST:
                this.orientation = ORIENTATIONS.SOUTH;
                break;
            case ORIENTATIONS.NORTH:
                this.orientation = ORIENTATIONS.EAST;
                break;
            case ORIENTATIONS.SOUTH:
                this.orientation = ORIENTATIONS.WEST;
                break;
        }
    }

    moveForward() {
        switch (this.orientation) {
            case ORIENTATIONS.WEST:
                this.posx -= 1;
                break;
            case ORIENTATIONS.EAST:
                this.posx += 1;
                break;
            case ORIENTATIONS.NORTH:
                this.posy -= 1;
                break;
            case ORIENTATIONS.SOUTH:
                this.posy += 1;
                break;
        }
        if (this.posx >= cols) {
            this.posx = 0;
        } else if (this.posy >= rows) {
            this.posy = 0;
        } else if (this.posx < 0) {
            this.posx = cols - 1;
        } else if (this.posy < 0) {
            this.posy = rows - 1;
        }
        
    }
}

const ORIENTATIONS = {
    WEST: "west",
    EAST: "east",
    NORTH: "north",
    SOUTH: "south"
}