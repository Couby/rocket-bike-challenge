#!/usr/bin/python3

from gpiozero import Button
from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import threading

hostName = "192.168.1.27"
hostPort = 9000

turns = 0

# HTTP server class.
class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        global turns
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("<html><head><title>Rocket bike challenge</title></head>", "utf-8"))
        self.wfile.write(bytes('<body>{"turns": %d}' % turns, "utf-8"))


# Thead class that permanently checks reed sensor status.
class ThreadingExample(object):
    def __init__(self):
        self.button = Button(2)
        #self.turns = 0
        thread = threading.Thread(target=self.run, args=())
        thread.daemon = True                            # Daemonize thread
        thread.start()                                  # Start the execution

    def run(self):
        global turns
        while True:
            if self.button.is_pressed == True:
                turns = turns + 1
                print("Button was pressed {} times".format(turns))
                while self.button.is_pressed:
                    pass

# Main function, launches the thread and the HTTP server
if __name__ == '__main__':
    print("Launching counter thread...")
    thread = ThreadingExample()
    print("Thread launched, launchint HTTP server...")
    myServer = HTTPServer((hostName, hostPort), MyServer)
    print(time.asctime(), "Server Starts - %s:%s" % (hostName, hostPort))

    try:
        myServer.serve_forever()
    except KeyboardInterrupt:
        pass

    myServer.server_close()
    print(time.asctime(), "Server Stops - %s:%s" % (hostName, hostPort))
