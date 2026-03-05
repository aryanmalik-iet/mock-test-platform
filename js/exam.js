const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const examScreen = document.getElementById("exam-screen");
const restartBtn = document.getElementById("restart-btn");
const totalQuestionsElement = document.getElementById("total-questions");
const resultScreen = document.getElementById("result-screen");
const timeLimit = 1 * 60; 

//ques length and time
totalQuestionsElement.textContent = questions.length;
document.getElementById("total-q").textContent = questions.length;
document.getElementById("time-limit").textContent = (timeLimit/60) + " minutes";

//question palatte

function generatePalette(){

const palette = document.getElementById("question-palette");
palette.innerHTML = "";

questions.forEach((q,index)=>{

const btn = document.createElement("button");
btn.textContent = index + 1;
btn.className = "palette-btn";

if(answers[index] !== undefined){
btn.classList.add("answered");
}

if(index === currentQuestion){
btn.classList.add("current");
}

btn.onclick = () => {
currentQuestion = index;
renderQuestion(questions[currentQuestion]);
};

palette.appendChild(btn);

});

}

//start exam
startBtn.onclick = () => {
startScreen.classList.add("hidden");
examScreen.classList.remove("hidden");

totalTime = timeLimit;

renderQuestion(questions[currentQuestion]);
generatePalette();
startTimer();
};


let currentQuestion = 0;
let answers = [];

function selectAnswer(index){
answers[currentQuestion] = index;
}


//next and previous button behivour
document.getElementById("next-btn").onclick = ()=>{
if(currentQuestion < questions.length - 1){
  currentQuestion++;
  renderQuestion(questions[currentQuestion]);
  generatePalette();
}
}

document.getElementById("prev-btn").onclick = ()=>{
if(currentQuestion > 0){
  currentQuestion--;
  renderQuestion(questions[currentQuestion]);
  generatePalette();
}
};

//submit test function
function submitTest(){

clearInterval(timerInterval);

let score = 0;

questions.forEach((q,i)=>{
if(answers[i] === q.answer){
score++;
}
});

const scoreDisplay = document.getElementById("score-display");

examScreen.classList.add("hidden");
resultScreen.classList.remove("hidden");

scoreDisplay.textContent = score;

}

//submit button
document.getElementById("submit-btn").onclick = submitTest;

//restart handler
restartBtn.onclick = () => {

document.getElementById("time-remaining").textContent = "00:00";

currentQuestion = 0;
answers = [];

resultScreen.classList.add("hidden");
startScreen.classList.remove("hidden");

}