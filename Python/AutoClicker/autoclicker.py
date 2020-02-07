import ctypes
import time
import keyboard

print("Please select clicking speed from the options below:")
print("1) 1 click per 1s")
print("2) 1 click per 500ms")
print("3) 1 click per 200ms")
print("4) 1 click per 100ms")
print("5) 1 click per 50ms")
print("6) Custom")
print("Warning: Speeds lower than 1cp/200ms can cause applications to lock down.")
speed = 0
while True:
    try:
        console = int(input())
        if console == 1:
            speed = 1000
        elif console == 2:
            speed = 500
        elif console == 3:
            speed = 200
        elif console == 4:
            speed = 100
        elif console == 5:
            speed = 50
        elif console == 6:
            print("Type a speed between 1ms and 10000ms")
            speed = int(input())
        else:
            print("No option for the input: " + str(console))
            print("Try again!")
        if (speed > 0 and speed <= 10000):
            break
        else:
            print("The speed selected is not within the margins: 1ms and 10000ms")
    except ValueError:
        print("Please use only numbers to choose your options!")

print("Clicking will start in 5 seconds.")
print("To stop clicking press and hold \"Q\".")
time.sleep(5)
print("Clicking has started!!!")
while True:
    ctypes.windll.user32.mouse_event(2, 0, 0, 0, 0)  # left down
    ctypes.windll.user32.mouse_event(4, 0, 0, 0, 0)  # left up
    time.sleep(speed / 1000)
    if keyboard.is_pressed('q'):
        break
print("Auto clicker is stopping")
time.sleep(2)