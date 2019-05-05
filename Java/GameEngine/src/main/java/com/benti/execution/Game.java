package com.benti.execution;

import com.benti.graphics.Screen;
import com.benti.input.Keyboard;

import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferStrategy;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferInt;

public class Game extends Canvas implements Runnable {
    public static String _VERSION = "0.1a";
    public static int _WIDTH = 300;
    public static int _HEIGHT = _WIDTH / 16 * 9;
    public static int _SCALE = 3;

    private Thread thread;
    private JFrame frame;
    private Keyboard key;
    private boolean running = false;

    private Screen screen;

    private BufferedImage image = new BufferedImage(_WIDTH, _HEIGHT, BufferedImage.TYPE_INT_RGB);
    private int[] pixels = ((DataBufferInt) image.getRaster().getDataBuffer()).getData();

    public Game() {
        Dimension size = new Dimension(_WIDTH * _SCALE, _HEIGHT * _SCALE);
        setPreferredSize(size);

        screen = new Screen(_WIDTH, _HEIGHT);
        frame = new JFrame();
        key = new Keyboard();

        addKeyListener(key);
    }

    public synchronized void start() {
        running = true;
        thread = new Thread(this, "Game - Main Thread");
        thread.start();
    }

    public synchronized void stop() {
        running = false;
        try {
            thread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void run() {
        long lastTime = System.nanoTime();
        long timer = System.currentTimeMillis();
        final double ns = 1000000000.0 / 60.0;
        double delta = 0;
        int frames = 0;
        int updates = 0;
        while (running) {
            long now = System.nanoTime();
            delta += (now - lastTime) / ns;
            lastTime = now;
            while (delta >= 1) {
                update();
                updates++;
                delta--;
            }
            render();
            frames++;

            if (System.currentTimeMillis() - timer >= 1000) {
                timer = System.currentTimeMillis();
                frame.setTitle("Game Engine - " + _VERSION + " - " + updates + " ups, " + frames + " fps");
                System.out.println(updates + " ups, " + frames + " fps");
                updates = 0;
                frames = 0;

            }
        }
        stop();
    }
    int x = 0, y = 0;

    public void update() {
        key.update();
        if (key.up) y--;
        if (key.down) y++;
        if (key.left) x--;
        if (key.right) x++;

    }


    public void render() {
        BufferStrategy bs = getBufferStrategy();
        if (bs == null) {
            createBufferStrategy(3);
            return;
        }
        screen.clear();
        screen.render(x, y);

        for (int i = 0; i < pixels.length; i++) {
            pixels[i] = screen.pixels[i];
        }

        Graphics g = bs.getDrawGraphics();

        g.drawImage(image, 0, 0, getWidth(), getHeight(), null);

        g.dispose();
        bs.show();
    }

    public static void main(String[] args) {
        Game game = new Game();
        game.frame.setResizable(false);
        game.frame.setTitle("Game Engine - " + _VERSION);
        game.frame.add(game);
        game.frame.pack();
        game.frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        game.frame.setLocationRelativeTo(null);
        game.frame.setVisible(true);

        game.start();
    }
}
