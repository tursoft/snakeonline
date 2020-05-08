interface Point {
    x: number;
    y: number;
}

interface Box {
    x: number;
    y: number;
    speedX?: number;
    speedY?: number;
}

class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    version = 'v1.0.0';
    bottomText = `${this.version}`;
    gametitle = 'Snake Online';

    lives = 3;
    score = 0;
    top = 90;
    left = 20;
    right = 20;
    bottom = 40;
    state = "paused"; // running, paused, gameover
    width = 0;
    height = 0;

    gameSpeed = 4;        
    gridSize = 20;
    boxColor = 'yellow';
    bgColor = 'black';
    targetBoxColor = 'green';
    head: Point = { x: 0, y: 0 }
    size = 5;
    speedX = 1;
    speedY = 0;
    maxX = 10;
    maxY = 10;
    boxes: Box[] = [];
    targetBox: Box = {x: 0, y: 0}; 

    timer: number = 0;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("game");
        this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        document.onkeydown = this.onKeyDown.bind(this);
        this.lives = 3;
        this.score = 0;
    }

    init() {
        this.state = 'running';
        
        this.width = this.canvas.width - (this.left + this.right);
        this.height = this.canvas.height - (this.top + this.bottom);

        this.head = { x: 10, y: 10 };
        this.size = 5;
        
        this.speedX = 1;
        this.speedY = 0;

        this.maxX = Math.ceil(this.width / this.gridSize);
        this.maxY = Math.ceil(this.height / this.gridSize);
        
        this.boxes = [];
        this.targetBox = { x: 5, y: 5 };
        this.setNewTarget();

        this.setGameSpeed(this.gameSpeed)
    }

    stop() {
        clearInterval(this.timer);
    }

    setGameSpeed(gameSpeed: number) {        
        this.stop();
        this.gameSpeed=gameSpeed;
        this.timer = setInterval(this.loop.bind(this), 1000 / this.gameSpeed);
    }

    update() {        
        if (this.state == 'running') {
            var newX = (this.head.x + this.speedX);
            var newY = (this.head.y + this.speedY);
            if (newX < 0) {
                newX = this.maxX-1; 
            }
    
            if (newY < 0) {
                newY = this.maxY-1;
            }
    
            if (newX >= this.maxX) {
                newX = 0;
            }
    
            if (newY >= this.maxY) {
                newY = 0;
            }
    
            this.head = { x: newX, y: newY };            
            let nexBox = {x: this.head.x, y: this.head.y, speedX: this.speedX, speedY: this.speedY};
            this.boxes.push(nexBox);

            if (this.boxes.length > this.size) {
                this.boxes.splice(0, 1);
            }

            // if target is catched
            if (this.isBoxInList(this.targetBox, this.boxes)) {
                this.score +=1;
                this.size +=1;
                this.setNewTarget();
                this.gameSpeed +=1;
            }

            // has collapse? gameover
            for(var i=0; i < this.boxes.length-1; i++) {
                var box = this.boxes[i];
                if (box.x == this.head.x && box.y == this.head.y) {
                    this.reset();
                }
            }
        }        
    }    

    onKeyDown(e: KeyboardEvent) {
        switch(e.keyCode) {
            // esc
            case 27:
                if (this.state == 'running') {
                    this.state = 'paused';
                } else if (this.state == "paused") {
                    this.state = 'running';
                }
            break;

            // left
            case 37:
                if (this.state == 'running' && this.speedX == 0) {
                    this.speedX = -1;
                    this.speedY = 0;
                }
            break;
            
            // right
            case 39: 
                if (this.state == 'running' && this.speedX == 0) {
                    this.speedX = 1;
                    this.speedY = 0;
                }
            break;

            // up
            case 38: 
                if (this.state == 'running' && this.speedY == 0) {
                    this.speedX = 0;
                    this.speedY = -1;
                }
            break;

            // down
            case 40: 
                if (this.state == 'running' && this.speedY == 0) {
                    this.speedX = 0;
                    this.speedY = 1;
                }
            break;
        }        
    }

    reset() {
        this.lives -=1;
        this.stop();

        if (this.lives <=0) {
            this.state = 'gameover';
        } else {            
            this.init();
        }
    }

    setNewTarget() {                
        do {
            var targetBox = { 
                x: Math.round(Math.random() * (this.maxX-1)),
                y: Math.round(Math.random() * (this.maxY-1))
            };        
        } while(this.isBoxInList(targetBox, this.boxes));
        this.targetBox=targetBox;        
    }

    isBoxInList(targetBox: Box, boxes: Box[]) {
        for(var i=0; i < boxes.length; i++) {
            var box = boxes[i];
            if (box.x == targetBox.x && box.y == targetBox.y) {
                return true;
            }
        }
        return false;
    }

    loop() {
        this.update();
        this.draw();        
    }

    draw() {
        // clear bg
        this.context.fillStyle = this.bgColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for(var x =0 ;x<this.maxX; x++) {
            for(var y =0 ;y<this.maxY; y++) {
                var box = {x: x, y: y};
                this.drawBox(box, '#242424', this.bgColor, false, false, null);
            }
        }

        // target draw box
        if (this.targetBox != null) {
            this.drawBox(this.targetBox, this.bgColor, this.targetBoxColor, false, false, null);            
        }

        // draw boxes
        var isHead = false;
        var isTail = false;
        var nextBox = null;
        for(var i =0 ;i<this.boxes.length; i++) {            
            let box = this.boxes[i]; 
            isHead = (i == this.boxes.length-1);
            isTail = (i == 0);
            nextBox = (!isHead ? this.boxes[i+1] : null);
            this.drawBox(box, this.bgColor, this.boxColor, isHead, isTail, nextBox);
        }
        

        // print game title
        this.context.fillStyle = 'white';
        this.context.font = '20px Arial';
        this.context.fillText(`${this.gametitle}`, (this.canvas.width - 150) / 2, 25);

        // draw top bg
        this.context.fillStyle = '#242424';
        this.context.fillRect(0, 40, this.canvas.width, this.top - 20 - 40);

        // print score
        this.context.fillStyle = 'white';
        this.context.font = '15px Arial';
        this.context.fillText(`Score: ${this.score}`, 10, 25 + 34);

        // print lives
        this.context.fillStyle = 'red';
        this.context.font = '15px Arial';
        this.context.fillText(`Lives: ${this.lives}`, this.width-30, 25 + 34);
        
        // print bottomText
        this.context.fillStyle = 'yellow';
        this.context.font = '15px Arial';
        this.context.fillText(`${this.bottomText}`, this.canvas.width-80, this.canvas.height-10);
        

        
        if (this.state == 'paused') {
            this.context.fillStyle = 'BLUE';
            this.context.font = '35px Arial';
            this.context.fillText(`PAUSED`, (this.width - 100)/2, this.top + 50);
        
        } else if (this.state == 'gameover') {
            var boxHeight = 60;
            var boxWidth = this.width;
            var boxX = this.left;
            var boxY = this.top+((this.height - boxHeight) / 2);            
            this.fillRect(boxX, boxY, this.width, boxHeight, 'red');

            this.context.fillStyle = 'white';
            this.context.font = '30px Arial';
            this.context.fillText(`GAMEOVER`, boxX + (boxWidth - 160)/2, boxY + 40);
        }
    }

    drawTriangle(p1: Point, p2: Point, p3: Point, color: string, fill: boolean) {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.moveTo(p1.x, p1.y);
        this.context.lineTo(p2.x, p2.y);
        this.context.lineTo(p3.x, p3.y);
        if (fill) {
            this.context.fill();
        } else {
            this.context.stroke();
        }    
    }

    drawBox(box: Box, strokeColor: string, fillColor: string, isHead: boolean, isTail: boolean, nextBox: Box | null) {
        var w = this.gridSize;
        var h = this.gridSize;
        var x1 =  this.left + (box.x * this.gridSize);
        var y1 =  this.top + (box.y * this.gridSize);                
        var x2 = x1 + w;
        var y2 = y1 + h;

        if (!isTail || nextBox == null) {
            this.fillRect(x1, y1, w, h, fillColor);
            this.strokeRect(x1, y1, w, h, 1, strokeColor)    
        } else {
            var p1 = { x: x1, y: y1 };
            var p2 = { x: x1, y: y2 };
            var p3 = { x: x2, y: y2 };

            var speedX = nextBox.speedX;
            var speedY = nextBox.speedY;

            if (speedX == -1) { // left
                p1 = {x: x1, y: y1 };
                p2 = {x: x1, y: y2 };
                p3 = {x: x2, y: y1 + h/2 };
            } else if (speedX == 1) { // right
                p1 = {x: x2, y: y1 };
                p2 = {x: x2, y: y2 };
                p3 = {x: x1, y: y1 + h/2 };
            } if (speedY == -1) { // up
                p1 = {x: x1, y: y1 };
                p2 = {x: x2, y: y1 };
                p3 = {x: x1 + h/2, y: y2 };
            } else if (speedY == 1) { // down
                p1 = {x: x1+w/2, y: y1 };
                p2 = {x: x2, y: y2 };
                p3 = {x: x1, y: y2 };
            }

            this.drawTriangle(p1, p2, p3, fillColor, true);
            this.drawTriangle(p1, p2, p3, strokeColor, false);  
        }
            
        if (isHead) {      
            var p1 = {x: 0, y: 0 };
            var p2 = {x: 0, y: 0 };
            var pw = 2;
            var ph = 2;
            if (this.speedX == -1) { // left
                p1 = {x: (x1 + 2), y: (y1 + 2) };
                p2 = {x: (x1 + 2), y: (y2 - ph - 4) };
            } else if (this.speedX == 1) { // right
                p1 = {x: (x2 - pw - 4), y: (y1 + 2) };
                p2 = {x: (x2 - pw - 4), y: (y2 - ph - 4) };
            } if (this.speedY == -1) { // up
                p1 = {x: (x1 + 2), y: (y1 + 2) };
                p2 = {x: (x2 - pw - 4), y: (y1 + 2) };
            } else if (this.speedY == 1) { // down
                p1 = {x: (x1 + 2), y: (y2 - ph - 4) };
                p2 = {x: (x2 - pw - 4), y: (y2 - ph - 4) };
            }
             
            this.fillRect(p1.x, p1.y, 4, 4, strokeColor);
            this.fillRect(p2.x, p2.y, 4, 4, strokeColor);
        }
    }

    // utils
    fillRect(x: number, y: number, w: number, h: number, fillColor: string) {
        this.context.fillStyle = fillColor;
        this.context.fillRect(x, y, w, h);
    }

    strokeRect(x: number, y: number, w: number,h: number,strokeWidth: number, strokeColor: string) {
        this.context.strokeStyle = strokeColor;
        this.context.lineWidth = strokeWidth;
        this.context.strokeRect(x, y, w, h)
    }
}

document.addEventListener("DOMContentLoaded", function(event) { 
    var game = new Game();
    game.init();
});