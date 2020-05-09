## SNAKE ONLINE
Enjoy like in your childhood!
Simple version of classical snake game that was popular in nokia phones in 2000s.

# Author
* Muhammet Turşak - Senior Software Architect (tursoft@gmail.com)
* http://tursoft.net

# Status
![Build and Deploy](https://github.com/tursoft/snakeonline/workflows/Build%20and%20Deploy/badge.svg?branch=master)

# Demo Deployment
* https://tursoft.github.io/snakeonline/

# Technologies
* Typescript, Javascript
* html, css
* [hastatic](https://github.com/abhin4v/hastatic)
* docker

# Platforms & Features
* Github
* Github Actions
* Github Pages
* Dockerhub
* Dockerhub - Github Integration

# Development Tools
* node.js (10+)
* npm (6+)
* Typescript Compiler (3.4.5+)
* VSCode Extension: Debugger for Chrome
* Modern Browser such as Chrome

# Build
* Execute `npm i`
* Execute `npm run build`
* Open browser and visit file `./index.html`

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

# Docker Build Commands

build the image
`sudo docker build . -t tursoft/snakeonline`

run a container
`sudo docker run --name snakeonline -d -p 8080:3000 tursoft/snakeonline`

push the image to registry
`sudo docker push tursoft/snakeonline`

# Docker Image & Container Deployment
* https://hub.docker.com/repository/docker/tursoft/snakeonline

pull image and run a container
* `sudo docker run --name snakeonline -d -p 8080:3000 tursoft/snakeonline`

# Helm Build & Deploy
Creating Helm Chart
* `npm run helm`

Installing Helm Chart (local)
* `npm run helm-install`

Installing Helm Chart (remote)
* `helm repo add snakeonline https://tursoft.github.io/snakeonline/charts`
* `helm install snakeonline snakeonline/snakeonline`
* `helm install snakeonline --set service.port=33000 snakeonline/snakeonline`
* https://tursoft.github.io/snakeonline/charts

# Screenshoot
![Screenshoot][screenshoot1]

[screenshoot1]: https://github.com/tursoft/snakeonline/blob/master/snake.gif?raw=true "Screenshoot"


# Roadmap
* Developing test scripts
* Improving game logic (levels, speed, lifes etc)
* Multiplayer mode (over websockets)
* Leadership board
* Save & Resume support
* Challenges