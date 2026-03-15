function renderQuestion(questionObj) {
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const reviewBtn = document.getElementById("review-btn");
  const revNextBtn = document.getElementById("review-next-btn");
  const clearBtn = document.getElementById("clear-btn");

  examState.visited[examState.currentQuestion] = true;
  document.getElementById("current-q").textContent = examState.currentQuestion + 1;

  questionContainer.textContent = questionObj.question;

  optionsContainer.innerHTML = "";

  const qIndex = examState.questionOrder[examState.currentQuestion];
  const order = examState.optionOrder[qIndex];

  order.forEach((optIndex, displayIndex) => {
    const btn = document.createElement("button");

    btn.textContent = questionObj.options[optIndex];
    btn.className = "option";

    if (examState.answers[examState.currentQuestion] === displayIndex) {
      btn.classList.add("selected");
    }

    btn.onclick = () => {
      selectAnswer(displayIndex);
      updateExamUI();
    };

    optionsContainer.appendChild(btn);
  });

  //review button text handler
  if (examState.review[examState.currentQuestion]) {
    reviewBtn.textContent = "Unmark Review";
  } else {
    reviewBtn.textContent = "Mark for Review";
  }

  //buttons dissabeling
  prevBtn.disabled = examState.currentQuestion === 0;
  nextBtn.disabled = examState.currentQuestion === questions.length - 1;
  revNextBtn.disabled = examState.currentQuestion === questions.length - 1;
  clearBtn.disabled = examState.answers[examState.currentQuestion] === null;
}
