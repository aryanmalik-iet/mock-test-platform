const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const header = document.getElementById("header");
const examScreen = document.getElementById("exam-screen");
const restartBtn = document.getElementById("restart-btn");
const totalQuestionsElement = document.getElementById("total-questions");
const resultScreen = document.getElementById("result-screen");
const timeLimit = 10 * 60;

//ques length and time
totalQuestionsElement.textContent = questions.length;
document.getElementById("total-q").textContent = questions.length;
document.getElementById("time-limit").textContent = timeLimit / 60 + " minutes";

//exam summary
let answered = 0;
let reviewCount = 0;
let answeredReview = 0;
let unvisited = 0;
let unanswered = 0;

function updateStatusCounts() {
  answered = 0;
  reviewCount = 0;
  answeredReview = 0;
  unvisited = 0;
  unanswered = 0;

  questions.forEach((q, i) => {
    if (!visited[i]) {
      unvisited++;
    } else if (answers[i] !== null && review[i]) {
      answeredReview++;
    } else if (review[i]) {
      reviewCount++;
    } else if (answers[i] !== null) {
      answered++;
    } else {
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

function generatePalette() {
  const palette = document.getElementById("question-palette");
  palette.innerHTML = "";

  questions.forEach((q, index) => {
    const btn = document.createElement("button");
    btn.textContent = index + 1;
    btn.className = "palette-btn";

    //quespllate state handeler
    if (index === currentQuestion) {
      btn.classList.add("current");
      if (answers[index] !== null && review[index]) {
        btn.classList.add("answered-review");
      } else if (answers[index] !== null) {
        btn.classList.add("answered");
      } else if (review[index]) {
        btn.classList.add("review");
      }
    } else {
      if (answers[index] !== null && review[index]) {
        btn.classList.add("answered-review");
      } else if (answers[index] !== null) {
        btn.classList.add("answered");
      } else if (review[index]) {
        btn.classList.add("review");
      } else if (visited[index]) {
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

  if (currentBtn) {
    currentBtn.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  }
}

function updateExamUI(){
  renderQuestion(Questions[currentQuestion]);
  generatePalette();
  saveExamState();
}

//start exam
startBtn.onclick = () => {
  startScreen.classList.add("hidden");
  header.classList.add("hidden");
  examScreen.classList.remove("hidden");

  totalTime = timeLimit;

  renderQuestion(questions[currentQuestion]);
  generatePalette();

  document.getElementById("time-remaining").textContent =
    String(timeLimit / 60).padStart(2, "0") + ":00";
  startTimer();
};

let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
let visited = new Array(questions.length).fill(false);
let review = new Array(questions.length).fill(false);

//answer selector
function selectAnswer(index) {
  answers[currentQuestion] = index;
  saveExamState();
}
//exam state saver to local storage
function saveExamState() {
  const state = {
    answers,
    visited,
    review,
    currentQuestion,
    totalTime,
  };

  localStorage.setItem("examState", JSON.stringify(state));
}

//localstorage state recovery
function loadExamState() {
  const savedState = localStorage.getItem("examState");

  if (!savedState) return;

  const state = JSON.parse(savedState);

  answers = state.answers;
  visited = state.visited;
  review = state.review;
  currentQuestion = state.currentQuestion;
  totalTime = state.totalTime;

  startScreen.classList.add("hidden");
  header.classList.add("hidden");
  examScreen.classList.remove("hidden");

  renderQuestion(questions[currentQuestion]);
  generatePalette();

  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  document.getElementById("time-remaining").textContent =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

  startTimer();
}

//Navigation button behivour

document.getElementById("review-btn").onclick = () => {
  review[currentQuestion] = !review[currentQuestion];
  updateExamUI();
};

document.getElementById("next-btn").onclick = () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    updateExamUI();
  }
};

document.getElementById("prev-btn").onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    updateExamUI();
  }
};
document.getElementById("review-next-btn").onclick = () => {
  review[currentQuestion] = true;
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
  }
  updateExamUI();
};

document.getElementById("clear-btn").onclick = () => {
  answers[currentQuestion] = null;
  updateExamUI();
};

//submit test function
function submitTest() {
  clearInterval(timerInterval);
  localStorage.removeItem("examState");

  let score = 0;

  questions.forEach((q, i) => {
    if (answers[i] === q.answer) {
      score++;
    }
  });

  const scoreDisplay = document.getElementById("score-display");

  examScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  scoreDisplay.textContent = score;
}

//submit button
document.getElementById("submit-btn").onclick = () => {
  updateStatusCounts();

  document.getElementById("modal-answered").textContent = answered;
  document.getElementById("modal-review").textContent = reviewCount;
  document.getElementById("modal-answered-review").textContent = answeredReview;
  document.getElementById("modal-unanswered").textContent = unanswered + unvisited;

  document.getElementById("submit-modal").classList.remove("hidden");
};

//submit modal buttons
document.getElementById("confirm-submit").onclick = () => {
  document.getElementById("submit-modal").classList.add("hidden");
  submitTest();
};

document.getElementById("cancel-submit").onclick = () => {
  document.getElementById("submit-modal").classList.add("hidden");
};

//restart handler
restartBtn.onclick = () => {
  clearInterval(timerInterval);
  localStorage.removeItem("examState");

  document.getElementById("time-remaining").textContent = "00:00";
  document.getElementById("question-palette").scrollTop = 0;

  currentQuestion = 0;
  answers = new Array(questions.length).fill(null);
  visited = new Array(questions.length).fill(false);
  review = new Array(questions.length).fill(false);

  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  header.classList.remove("hidden");
};

loadExamState();
