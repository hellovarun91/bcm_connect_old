BCM Connect - Deployment Instructions
======================================

PREREQUISITES
-------------
- Node.js installed (https://nodejs.org - download LTS version)
- InteractiveScape table configured to send TUIO on UDP port 3333


FIRST TIME SETUP
----------------
1. Install Node.js from https://nodejs.org (LTS version)
2. Double-click START_SERVER.bat (it will auto-install dependencies)


RUNNING THE APP
---------------
1. Double-click START_SERVER.bat  (starts the TUIO server)
2. Double-click the app .exe       (starts the app)
3. Place tags on the InteractiveScape table

To stop: Double-click STOP_SERVER.bat


TAG IDS
-------
The app supports both TUIO Simulator and InteractiveScape tags:

  Tag Role          | Simulator ID | InteractiveScape ID
  ------------------|-------------|--------------------
  Trigger (start)   | 1           | 22
  Smart Mobility    | 2           | 23
  Petrol            | 3           | 24
  Coffee            | 4           | 25
  Shopping          | 5           | 26
  Healthcare        | 6           | 27


EDITING CONFIG
--------------
Open config.json in any text editor to change:
- socketUrl     : WebSocket server address (default: http://localhost:5002)
- serverPort    : Server port (default: 5002)
- tuioUdpPort   : TUIO UDP port (default: 3333)
- Tag ID mappings

After editing config.json, restart the server (STOP then START).


FOLDER STRUCTURE
----------------
  win_build/
    config.json        <-- edit this to change settings
    START_SERVER.bat   <-- double-click to start server
    STOP_SERVER.bat    <-- double-click to stop server
    README.txt         <-- this file
    server/
      server.js        <-- TUIO + WebSocket server
      package.json     <-- server dependencies


TROUBLESHOOTING
---------------
- "node is not recognized": Install Node.js from https://nodejs.org
- Server won't start: Check if port 5002 is already in use
- No TUIO data: Make sure InteractiveScape is sending to UDP port 3333
- App can't connect: Make sure START_SERVER.bat is running first
