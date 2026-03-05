function renderQuestion(questionObj) {

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
document.getElementById("current-q").textContent = currentQuestion + 1;

questionContainer.textContent = questionObj.question;

optionsContainer.innerHTML = "";

questionObj.options.forEach((opt,index)=>{
const btn = document.createElement("button");
btn.textContent = opt;
btn.className = "option";
if(answers[currentQuestion] === index){
btn.classList.add("selected");
}
btn.onclick = () => {
selectAnswer(index);
renderQuestion(questions[currentQuestion]);
generatePalette();
};
optionsContainer.appendChild(btn);
});
prevBtn.disabled = currentQuestion === 0;
nextBtn.disabled = currentQuestion === questions.length - 1;
}