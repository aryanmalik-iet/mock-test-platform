let totalTime; 
let timerInterval;

function startTimer(){

timerInterval = setInterval(() => {

totalTime--;

const minutes = Math.floor(totalTime / 60);
const seconds = totalTime % 60;

document.getElementById("time-remaining").textContent =
String(minutes).padStart(2,"0") + ":" +
String(seconds).padStart(2,"0");

if(totalTime <= 0){
clearInterval(timerInterval);
submitTest();
}

},1000);

}