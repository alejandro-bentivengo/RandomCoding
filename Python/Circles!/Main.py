import sys
from directKeys import moveMouseTo, queryMousePosition, holdClick, releaseClick, click
import time
# Thanks to Code Bullet for the directKeys library! :)
time.sleep(5)


def drawCircle(x0, y0, r):
    x = r
    y = 0
    err = 1-x
    while (x >= y):
        click(x + x0,  y + y0)
        click(y + x0,  x + y0)
        click(-x + x0,  y + y0)
        click(-y + x0,  x + y0)
        click(-x + x0, -y + y0)
        click(-y + x0, -x + y0)
        click(x + x0, -y + y0)
        click(y + x0, -x + y0)
        y = y + 1
        if (err < 0):
            err = err + 2 * y + 1
        else:
            x = x - 1
            err = err + 2 * (y - x + 1)


# Draws a perfect circle with a center in x0 - y0 and a radius of r
# Why? No real reason honestly... I just wanted to write an algorithm to draw a circle.
drawCircle(400, 400, 150)
