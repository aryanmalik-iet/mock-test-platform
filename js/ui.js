function renderQuestion(questionObj) {

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
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
};
optionsContainer.appendChild(btn);
});
}