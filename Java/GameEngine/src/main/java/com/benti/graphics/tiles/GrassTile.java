package com.benti.graphics.tiles;

import com.benti.graphics.Screen;
import com.benti.graphics.Sprite;

public class GrassTile extends Tile {

    public GrassTile(Sprite sprite) {
        super(sprite);
        this.walkable = true;
    }

    public void render(int x, int y, Screen screen) {

    }
}
