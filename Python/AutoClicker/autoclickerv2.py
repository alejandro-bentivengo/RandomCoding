import ctypes
import time
import keyboard
import os

clear = lambda: os.system('cls')

clear()

title = "Autoclicker | "
speed = 500
ctypes.windll.kernel32.SetConsoleTitleW(title + "1 click per " + str(speed) + "ms")

def printMenusAndClicks():
    global speed
    clear()
    print("Autoclicker v2:")
    print("Press F5 to decrease clicking speed")
    print("Press F8 to increase clicking speed")
    print("When ready press F9 to start clicking")
    print("Press F10 to go back to speed selection")
    print("Press Q to exit program")
    print("")
    print("Valid speeds: between 0 (super fast) and 1000 (once per second)")
    print("")
    print("Current selected speed: 1 click per " + str(speed) + "ms")

def runClicker():
    global speed
    while True:
        if keyboard.is_pressed('f10'):
            print("Turning off autoclicker!")
            return
        ctypes.windll.user32.mouse_event(2, 0, 0, 0, 0)  # left down
        ctypes.windll.user32.mouse_event(4, 0, 0, 0, 0)  # left up
        time.sleep(speed / 1000)


def speedOnOff():
    global speed
    printMenusAndClicks()
    while True:
        if keyboard.is_pressed('f8'):
            if speed >= 1000:
                print("Click speed is already maxed!")
            else:
                speed += 50
                ctypes.windll.kernel32.SetConsoleTitleW(title + "1 click per " + str(speed) + "ms")
                printMenusAndClicks()
        elif keyboard.is_pressed('f5'):
            if speed <= 0:
                print("Click speed is already at minimum value!")
            else:
                speed -= 50
                ctypes.windll.kernel32.SetConsoleTitleW(title + "1 click per " + str(speed) + "ms")
                printMenusAndClicks()
        elif keyboard.is_pressed('f9'):
            print("Turning on autoclicker!")
            runClicker()
        elif keyboard.is_pressed('q'):
            exit()
        time.sleep(200/1000)

speedOnOff()