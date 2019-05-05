package com.benti.graphics;

public class Sprite {
    public final int _SIZE;
    private int x, y;
    public int[] pixels;
    private SpriteSheet sheet;


    public static Sprite grass = new Sprite(16,0, 0, SpriteSheet.tiles);

    public Sprite(int size, int x, int y, SpriteSheet sheet) {
        this._SIZE = size;
        this.x = x * _SIZE;
        this.y = y * _SIZE;
        this.sheet = sheet;
        this.pixels = new int[_SIZE * _SIZE];
        load();
    }

    private void load() {
        for (int y = 0; y < _SIZE; y++) {
            for (int x = 0; x < _SIZE; x++) {
                pixels[x + y * _SIZE] = sheet.pixels[(x + this.x) + (y + this.y) * sheet._SIZE];
            }
        }
    }
}
