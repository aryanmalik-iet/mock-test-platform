let timerInterval;


function startTimer() {
  timerInterval = setInterval(() => {
    examState.totalTime--;
    saveExamState();

    const minutes = Math.floor(examState.totalTime / 60);
    const seconds = examState.totalTime % 60;

    document.getElementById("time-remaining").textContent =
      String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

    if (examState.totalTime <= 0) {
      clearInterval(timerInterval);
      submitTest();
    }
  }, 1000);
}
