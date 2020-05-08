## SNAKE ONLINE
Simple version of classical snake game that was popular in nokia phones in 2000s.

# Author
* Muhammet Turşak - Senior Software Architect (tursoft@gmail.com)
* http://tursoft.net

# Technologies
* typescript, js
* html, css

# Development Tools
* node.js  (10+)
* npm  (6+)
* Typescript Compiler  (3.4.5 or latest)
* VSCode Extension: Debugger for Chrome
* Modern Browser such as Chrome

# Build
* Execute `npm i`
* Execute `tsc`
* Open browser

# Run
* Start on VSCode (F5)
* Browser will automatically opened

# Debug
* Execute tsc:watch task by ctrl+p and run-task
* or on terminal, execute `tsc -watch`
* Start on VSCode (Ctrl+F5)
* Browser will automatically opened
* Make your change and tsc will re-generate js files automatically
* Refresh browser to check changes

# Docker Commands
`
sudo docker build -t tursoft/snakeonline .
# run with default configs
sudo docker run --name snakeonline -d -p 8080:3000 tursoft/snakeonline
# push image
sudo docker push tursoft/snakeonline
`

# Screenshoot
![Screenshoot][screenshoot1]

[screenshoot1]: snake.gif "Screenshoot"


# Roadmap
* Developing test scripts
* Improving game logic (levels, speed, lifes etc)
* Multiplayer mode (over websockets)
* Leadership board
* Save & Resume support
* Challenges