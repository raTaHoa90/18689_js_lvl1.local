var painting;

class Painting {
    #canvas;
    #ctx;
    #offset = 0;
    #flagReverse = false;
    
    constructor(canvasElement){
        this.#canvas = canvasElement;
        this.#ctx = canvasElement.getContext('2d');

        canvasElement.width = 400;
        canvasElement.height = 400;

        this.draw();
    }

    draw(){
        this.#ctx.strokeStyle = "black";
        this.#ctx.lineWidth = 5;
        this.#ctx.fillStyle = "rgba(255, 0, 0, .5)";

        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        this.#ctx.fillRect(5,5, 100, 100);
        this.#ctx.strokeRect(5,5, 100, 100);

        this.#ctx.strokeStyle = "green";
        this.#ctx.lineWidth = 5;
        this.#ctx.fillStyle = "blue";

        this.#ctx.beginPath();
            this.#ctx.moveTo(20 + this.#offset, 18);
            this.#ctx.lineTo(100 + this.#offset, 100);
            this.#ctx.lineTo(20 + this.#offset, 180);
            this.#ctx.lineTo(20 + this.#offset, 18);
            this.#ctx.fill();
            this.#ctx.stroke();
        this.#ctx.closePath();

        if(this.#flagReverse)
            this.#offset--;
        else
            this.#offset++;

        if(this.#offset == 0 || this.#offset == 25)
            this.#flagReverse = !this.#flagReverse;
    }
}

function AnimationFrame(){
    painting.draw();
    window.requestAnimationFrame(AnimationFrame);
}

document.addEventListener('DOMContentLoaded', function(){
    painting = new Painting(document.getElementById('holst'));
    window.requestAnimationFrame(AnimationFrame);
});