import { questions } from "./questions.js";

const params = new URLSearchParams(window.location.search);
const score = params.get("score");
const highScore = localStorage.getItem("highScore") || 0;
const totalQuestions = questions.length;

if (score > highScore) {
  localStorage.setItem("highScore", score);
}

document.getElementById("result-score").textContent = `You scored ${score} out of ${totalQuestions}`
document.getElementById("high-score").textContent = `Your high score is ${Math.max(score, highScore)}`;

if (score < (totalQuestions/2)) {
  document.getElementById('result-title').textContent = 'Keep Practicing!'
} else if (score == (totalQuestions/2)) {
  document.getElementById('result-title').textContent = 'Good Try!' 
} else if (score > (totalQuestions/2) && score < totalQuestions) {
  document.getElementById('result-title').textContent = 'Well Done!' 
} else if (score == (totalQuestions)) {
  document.getElementById('result-title').textContent = 'Perfect Score!'
}
