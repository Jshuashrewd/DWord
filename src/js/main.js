import { questions } from "./questions.js";

let currentQuestionIndex = 0;
let score = 0;
let timer;


if (window.location.pathname.includes("quiz.html")) {
  const questionContainer = document.getElementById("question");
  const optionsContainer = document.getElementById("options");
  const timeDisplay = document.getElementById("time-left");

  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option) => {
      const button = document.createElement("button");
      button.classList.add("option-button")
      button.textContent = option;
      button.onclick = () => checkAnswer(option, button);
      optionsContainer.appendChild(button);
    });

    document.getElementById("total-questions").textContent = questions.length;

    resetTimer();
  }

  function checkAnswer(selectedOption, button) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const currentScore = document.getElementById("current-score");

    if (selectedOption === correctAnswer) {
      score++;
      currentScore.textContent = score;
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect")
    }

    currentQuestionIndex++;
    setTimeout(() => {
      if (currentQuestionIndex < questions.length) {
        loadQuestion();
      } else {
        window.location.href = `results.html?score=${score}`;
      }
    }, 1000);
  }

  function resetTimer () {
    clearInterval(timer);
    let timeleft = 15;
    timeDisplay.textContent = timeleft;

    timer = setInterval(() => {
      timeleft--;
      timeDisplay.textContent = timeleft;

      if (timeleft <= 0) {
        currentQuestionIndex ++;

        if (currentQuestionIndex < questions.length) {
          clearInterval(timer);
          loadQuestion();
        } else {
          clearInterval(timer);
          window.location.href = `results.html?score=${score}`;
        }

      }
    }, 1000);
  }

  loadQuestion();
}