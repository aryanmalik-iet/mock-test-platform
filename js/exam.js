const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const examScreen = document.getElementById("exam-screen");
const restartBtn = document.getElementById("restart-btn");
const totalQuestionsElement = document.getElementById("total-questions");
const timeLimit = 15; 

//ques length and time
totalQuestionsElement.textContent = questions.length;
document.getElementById("total-q").textContent = questions.length;
document.getElementById("time-limit").textContent = timeLimit + " minutes";

startBtn.onclick = () => {
startScreen.classList.add("hidden");
examScreen.classList.remove("hidden");

renderQuestion(questions[currentQuestion]);
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
}
}

document.getElementById("prev-btn").onclick = ()=>{
if(currentQuestion > 0){
  currentQuestion--;
  renderQuestion(questions[currentQuestion]);
}
};


//submit button
document.getElementById("submit-btn").onclick = ()=>{
let score = 0;

questions.forEach((q,i)=>{
if(answers[i] === q.answer){
score++;
}
});

//Restart button 
restartBtn.onclick = () => {

currentQuestion = 0;
answers = [];

resultScreen.classList.add("hidden");
startScreen.classList.remove("hidden");

};


// result section
const resultScreen = document.getElementById("result-screen");
const scoreDisplay = document.getElementById("score-display");

examScreen.classList.add("hidden");
resultScreen.classList.remove("hidden");

scoreDisplay.textContent = score;
};