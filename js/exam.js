// DOM Refrences
const startBtn = document.getElementById("start-btn");
const instructionScreen = document.getElementById("instruction-screen");
const homeScreen = document.getElementById("home-screen");
const header = document.getElementById("header");
const examScreen = document.getElementById("exam-screen");
const restartBtn = document.getElementById("restart-btn");
const totalQuestionsElement = document.getElementById("total-questions");
const resultScreen = document.getElementById("result-screen");

let selectedTest = null;

// select test button
document.querySelectorAll(".start-test-btn").forEach((btn) => {
  btn.onclick = () => {
    selectedTest = btn.dataset.test;

    console.log("Selected Test:", selectedTest);

    homeScreen.classList.add("hidden");
    instructionScreen.classList.remove("hidden");
  };
});

// exam configuration
const examConfig = {
  timeLimit: 10 * 60,
};
//Initial UI Setup
totalQuestionsElement.textContent = questions.length;
document.getElementById("total-q").textContent = questions.length;
document.getElementById("time-limit").textContent =
  examConfig.timeLimit / 60 + " minutes";

//exam status counter
let answered = 0;
let reviewCount = 0;
let answeredReview = 0;
let unvisited = 0;
let unanswered = 0;

//Status Calculation
function updateStatusCounts() {
  answered = 0;
  reviewCount = 0;
  answeredReview = 0;
  unvisited = 0;
  unanswered = 0;

  questions.forEach((q, i) => {
    if (!examState.visited[i]) {
      unvisited++;
    } else if (examState.answers[i] !== null && examState.review[i]) {
      answeredReview++;
    } else if (examState.review[i]) {
      reviewCount++;
    } else if (examState.answers[i] !== null) {
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

// Uitility fuinctions

//questions suffling
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//UI Rendering Helpers

//question palatte
function generatePalette() {
  const palette = document.getElementById("question-palette");
  palette.innerHTML = "";

  questions.forEach((q, index) => {
    const btn = document.createElement("button");
    btn.textContent = index + 1;
    btn.className = "palette-btn";

    //quespllate state handeler
    if (index === examState.currentQuestion) {
      btn.classList.add("current");
      if (examState.answers[index] !== null && examState.review[index]) {
        btn.classList.add("answered-review");
      } else if (examState.answers[index] !== null) {
        btn.classList.add("answered");
      } else if (examState.review[index]) {
        btn.classList.add("review");
      }
    } else {
      if (examState.answers[index] !== null && examState.review[index]) {
        btn.classList.add("answered-review");
      } else if (examState.answers[index] !== null) {
        btn.classList.add("answered");
      } else if (examState.review[index]) {
        btn.classList.add("review");
      } else if (examState.visited[index]) {
        btn.classList.add("visited");
      }
    }
    btn.onclick = () => {
      examState.currentQuestion = index;
      syncExamUI();
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

// UI SYNC PIPELINE
function syncExamUI() {
  renderQuestion(questions[examState.questionOrder[examState.currentQuestion]]);
  generatePalette();
  saveExamState();
}

//Exam Start Function

function startExam() {
  instructionScreen.classList.add("hidden");
  header.classList.add("hidden");
  examScreen.classList.remove("hidden");

  examState.totalTime = examConfig.timeLimit;
  document.getElementById("time-remaining").textContent =
    String(examConfig.timeLimit / 60).padStart(2, "0") + ":00";

  examState.questionOrder = [...Array(questions.length).keys()];
  shuffleArray(examState.questionOrder);

  examState.optionOrder = questions.map((q) => {
    const order = [...Array(q.options.length).keys()];
    shuffleArray(order);
    return order;
  });
}



//start button
startBtn.onclick = () => {
  startExam();
  syncExamUI();
  startTimer();
};

//Exam State
let examState = {
  currentQuestion: 0,
  answers: new Array(questions.length).fill(null),
  visited: new Array(questions.length).fill(false),
  review: new Array(questions.length).fill(false),
  questionOrder: [],
  optionOrder: [],
  totalTime: 0,
};
//answer selector
function selectAnswer(index) {
  examState.answers[examState.currentQuestion] = index;
}
//exam state saver to local storage
function saveExamState() {
  localStorage.setItem("examState", JSON.stringify(examState));
}

//localstorage state recovery
function loadExamState() {
  const savedState = localStorage.getItem("examState");

  if (!savedState) return;

  examState = JSON.parse(savedState);

  homeScreen.classList.add("hidden");
  header.classList.add("hidden");
  examScreen.classList.remove("hidden");

  renderQuestion(questions[examState.questionOrder[examState.currentQuestion]]);
  generatePalette();

  const minutes = Math.floor(examState.totalTime / 60);
  const seconds = examState.totalTime % 60;

  document.getElementById("time-remaining").textContent =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

  startTimer();
}

//Navigation button behivour
document.getElementById("review-btn").onclick = () => {
  examState.review[examState.currentQuestion] =
    !examState.review[examState.currentQuestion];
  syncExamUI();
};

document.getElementById("next-btn").onclick = () => {
  if (examState.currentQuestion < questions.length - 1) {
    examState.currentQuestion++;
    syncExamUI();
  }
};

document.getElementById("prev-btn").onclick = () => {
  if (examState.currentQuestion > 0) {
    examState.currentQuestion--;
    syncExamUI();
  }
};
document.getElementById("review-next-btn").onclick = () => {
  examState.review[examState.currentQuestion] = true;
  if (examState.currentQuestion < questions.length - 1) {
    examState.currentQuestion++;
  }
  syncExamUI();
};

document.getElementById("clear-btn").onclick = () => {
  examState.answers[examState.currentQuestion] = null;
  syncExamUI();
};

//calculate score function

function calculateScore() {
  let score = 0;

  questions.forEach((q, i) => {
    const qIndex = examState.questionOrder[i];
    const correctOriginalIndex = questions[qIndex].correct;
    const shuffledIndex =
      examState.optionOrder[qIndex].indexOf(correctOriginalIndex);

    if (examState.answers[i] === shuffledIndex) {
      score++;
    }
  });

  const scoreDisplay = document.getElementById("score-display");
  scoreDisplay.textContent = score;
}

//submit test function
function submitTest() {
  clearInterval(timerInterval);
  localStorage.removeItem("examState");
  calculateScore();
  examScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
}

//submit button
document.getElementById("submit-btn").onclick = () => {
  updateStatusCounts();

  document.getElementById("modal-answered").textContent = answered;
  document.getElementById("modal-review").textContent = reviewCount;
  document.getElementById("modal-answered-review").textContent = answeredReview;
  document.getElementById("modal-unanswered").textContent =
    unanswered + unvisited;

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

  examState.currentQuestion = 0;
  examState.answers = new Array(questions.length).fill(null);
  examState.visited = new Array(questions.length).fill(false);
  examState.review = new Array(questions.length).fill(false);
  examState.questionOrder = [];
  examState.optionOrder = [];

  resultScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
  header.classList.remove("hidden");
};

loadExamState();
