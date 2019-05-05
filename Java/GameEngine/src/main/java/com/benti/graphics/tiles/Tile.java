package com.benti.graphics.tiles;

import com.benti.graphics.Screen;
import com.benti.graphics.Sprite;

public abstract class Tile {

    public int x, y;
    public Sprite sprite;

    protected boolean solid = false;
    protected boolean walkable = false;
    protected boolean destroyable = false;


    public static Tile grass = new GrassTile(Sprite.grass);


    public Tile(Sprite sprite) {
        this.sprite = sprite;
    }

    public void render(int x, int y, Screen screen) {

    }

    public boolean solid() {
        return solid;
    }

    public boolean walkable() {
        return walkable;
    }

    public boolean destroyable() {
        return destroyable;
    }

}
