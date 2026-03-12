function renderQuestion(questionObj) {
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const reviewBtn = document.getElementById("review-btn");
  const revNextBtn = document.getElementById("review-next-btn");
  const clearBtn = document.getElementById("clear-btn");

  visited[currentQuestion] = true;
  document.getElementById("current-q").textContent = currentQuestion + 1;

  questionContainer.textContent = questionObj.question;

  optionsContainer.innerHTML = "";

  questionObj.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "option";
    if (answers[currentQuestion] === index) {
      btn.classList.add("selected");
    }
    btn.onclick = () => {
      selectAnswer(index);
      updateExamUI()
    };
    optionsContainer.appendChild(btn);
  });

  //review button text handler
  if (review[currentQuestion]) {
    reviewBtn.textContent = "Unmark Review";
  } else {
    reviewBtn.textContent = "Mark for Review";
  }

  //buttons dissabeling
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = currentQuestion === questions.length - 1;
  revNextBtn.disabled = currentQuestion === questions.length - 1;
  clearBtn.disabled = answers[currentQuestion] === null;
}
