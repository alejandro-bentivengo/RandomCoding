package com.benti.graphics;

import sun.security.util.AuthResources_sv;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;

public class SpriteSheet {

    private String path;
    protected final int _SIZE;
    public int[] pixels;

    public static SpriteSheet tiles = new SpriteSheet("/textures/spritesheet.png", 256);

    public SpriteSheet(String path, int size) {
        this.path = path;
        this._SIZE = size;
        pixels = new int[_SIZE * _SIZE];
        load();
    }

    private void load() {
        try {
            BufferedImage image = ImageIO.read(SpriteSheet.class.getResource(path));
            int w = image.getWidth();
            int h = image.getHeight();
            image.getRGB(0, 0, w, h, pixels, 0, w);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
