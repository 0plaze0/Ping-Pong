import Ball from "./Ball.js"
import Paddle from "./paddle.js"


const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
let lastTime;
const update = (time)=>{
    if(lastTime != null){
        const delta = time-lastTime;

        computerPaddle.update(delta, ball.y);
        
        // ball.update(delta);
    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

document.addEventListener("mousemove",(event)=>{
    playerPaddle.position = (event.y/window.innerHeight)*100;
})

window.requestAnimationFrame(update);//if we can update a frame then run the function
//update it passed an time agrument from requestAnimationFrame
