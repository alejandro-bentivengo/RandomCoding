from PIL import Image, ImageFilter
from directKeys import click, queryMousePosition
import time
import keyboard

img = Image.open('res/image.jpg')
WIDTH, HEIGHT = img.size

data = list(img.getdata())

data = [data[offset:offset + WIDTH]
        for offset in range(0, WIDTH * HEIGHT, WIDTH)]


class Coords(object):
    def __init__(self, xp, yp):
        self.xp = xp
        self.yp = yp


# Put here the coordinates where the mouse needs to be to click on each colour
WHITE = Coords(847, 82)
BLACK = Coords(847, 58)
GRAY = Coords(868, 59)
LIGHTERGRAY = Coords(869, 82)

# 10 seconds to get to paint
time.sleep(10)

offsetX = 200
offsetY = 200
x = 0
y = 0
currentColour = 'N'
for row in data:
    for col in row:
        if 0 <= col[1] < 64:
            if currentColour != 'B':
                click(BLACK.xp, BLACK.yp)
                time.sleep(0.005)
                currentColour = 'B'
            click(y + offsetY, x + offsetX)
        elif 64 <= col[1] < 127:
            if currentColour != 'G':
                click(GRAY.xp, GRAY.yp)
                time.sleep(0.005)
                currentColour = 'G'
            click(y + offsetY, x + offsetX)
        elif 127 <= col[1] < 191:
            if currentColour != 'S':
                click(LIGHTERGRAY.xp, LIGHTERGRAY.yp)
                time.sleep(0.005)
                currentColour = 'S'
            click(y + offsetY, x + offsetX)
        else:
            if currentColour != 'W':
                click(WHITE.xp, WHITE.yp)
                time.sleep(0.005)
                currentColour = 'W'
            click(y + offsetY, x + offsetX)
        time.sleep(0.005)
        y += 1
        # Escape route in case you need to stop the algorithm
        if keyboard.is_pressed('q'):
            exit()
    y = 0
    x += 1
