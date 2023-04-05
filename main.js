import Ball from "./Ball.js"
import Paddle from "./paddle.js"


const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");



let lastTime;
const update = (time)=>{
    if(lastTime != null){
        const delta = time-lastTime;
        ball.update(delta,[playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y);
        const hue = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--hue")
        );
        document.documentElement.style.setProperty("--hue", hue*0.1);
        if(isLose()) handleLose();
    }

        
    lastTime = time;
    window.requestAnimationFrame(update);
}

function isLose(){
    const rect = ball.rect();
    return rect.right >= innerWidth || rect.left <= 0;
}
function handleLose(){
    const rect = ball.rect();
    if(rect.right >= window.innerWidth){
        playerScoreElem.textContent = parseFloat(playerScoreElem.textContent)+1;
    }
    else{
        computerScoreElem.textContent = parseFloat(computerScoreElem.textContent)+1;
    }
    ball.reset();
    computerPaddle.reset();
}

document.addEventListener("mousemove",(event)=>{
    playerPaddle.position = (event.y/window.innerHeight)*100;
})

window.requestAnimationFrame(update);//if we can update a frame then run the function
//update it passed an time agrument from requestAnimationFrame
