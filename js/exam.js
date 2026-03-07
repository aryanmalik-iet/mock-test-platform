const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const header = document.getElementById("header");
const examScreen = document.getElementById("exam-screen");
const restartBtn = document.getElementById("restart-btn");
const totalQuestionsElement = document.getElementById("total-questions");
const resultScreen = document.getElementById("result-screen");
const timeLimit = 1 * 60; 

//ques length and time
totalQuestionsElement.textContent = questions.length;
document.getElementById("total-q").textContent = questions.length;
document.getElementById("time-limit").textContent = (timeLimit/60) + " minutes";

//exam summry
function updateStatusCounts(){

let answered = 0;
let reviewCount = 0;
let answeredReview = 0;
let unvisited = 0;
let unanswered = 0;

questions.forEach((q,i)=>{

if(!visited[i]){
unvisited++;
}

else if(answers[i] !== null && review[i]){
answeredReview++;
}

else if(review[i]){
reviewCount++;
}

else if(answers[i] !== null){
answered++;
}

else {
unanswered++;
}

});

document.getElementById("count-answered").textContent = answered;
document.getElementById("count-review").textContent = reviewCount;
document.getElementById("count-unanswered").textContent = unanswered;
document.getElementById("count-answered-review").textContent = answeredReview;
document.getElementById("count-unvisited").textContent = unvisited;

}
//question palatte

function generatePalette(){

const palette = document.getElementById("question-palette");
palette.innerHTML = "";

questions.forEach((q,index)=>{

const btn = document.createElement("button");
btn.textContent = index + 1;
btn.className = "palette-btn";

//quespllate state handeler 
if(index === currentQuestion) {
    btn.classList.add("current");
    if(answers[index] !== null && review[index]){
        btn.classList.add("answered-review");
    }
    else if(answers[index] !== null){
        btn.classList.add("answered");
    }
    else if(review[index]){
        btn.classList.add("review");
    }
}
else {
    if(answers[index] !== null && review[index]){
        btn.classList.add("answered-review");
    }
    else if (answers[index] !== null) {
    btn.classList.add("answered");
    }
    else if (review[index]) {
      btn.classList.add("review");
    }
    else if (visited[index]) {
      btn.classList.add("visited");
    }
}
btn.onclick = () => {
currentQuestion = index;
renderQuestion(questions[currentQuestion]);
generatePalette();
};

palette.appendChild(btn);

});
updateStatusCounts();

const currentBtn = palette.querySelector(".palette-btn.current");

if(currentBtn){
currentBtn.scrollIntoView({
block: "nearest",
inline: "nearest",
behavior: "smooth"
});
}
}

//review button 
document.getElementById("review-btn").onclick = () => {
review[currentQuestion] = !review[currentQuestion];
generatePalette();

};

//start exam
startBtn.onclick = () => {
startScreen.classList.add("hidden");
header.classList.add("hidden");
examScreen.classList.remove("hidden");

totalTime = timeLimit;

renderQuestion(questions[currentQuestion]);
generatePalette();

document.getElementById("time-remaining").textContent =
String(timeLimit / 60).padStart(2,"0") + ":00";
startTimer();
};


let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
let visited = new Array(questions.length).fill(false);
let review = new Array(questions.length).fill(false);

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
document.getElementById("review-next-btn").onclick = () => {
review[currentQuestion] = true;
if(currentQuestion < questions.length - 1){
currentQuestion++;
}
renderQuestion(questions[currentQuestion]);
generatePalette();

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
clearInterval(timerInterval);

document.getElementById("time-remaining").textContent = "00:00";
document.getElementById("question-palette").scrollTop = 0;

currentQuestion = 0;
answers = new Array(questions.length).fill(null);
visited = new Array(questions.length).fill(false);
review = new Array(questions.length).fill(false);

resultScreen.classList.add("hidden");
startScreen.classList.remove("hidden");
header.classList.remove("hidden");

}