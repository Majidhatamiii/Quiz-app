import formatData from "./helper.js";

const level = localStorage.getItem("levels") || "medium";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-txt");
const answerList = document.querySelectorAll(".answer-txt");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const scoreTxt = document.getElementById("score");
const questionNumber = document.getElementById("question-number");
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;
const CORRECT_BONUS = 10;
let formattedData = null;
let correctAnswer = null;
let questionIndex = 0;
let score = 0;
let isAccepted = true;

const fetchData = async () => {
  const response = await fetch(URL);
  const json = await response.json();
  formattedData = formatData(json.results);
  start();
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  questionNumber.innerText = questionIndex + 1;
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  console.log(correctAnswer);
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;
  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    scoreTxt.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

const nextHandler = () => {
  questionIndex++;
  if (questionIndex < formattedData.length) {
    isAccepted = true;
    showQuestion();
    removeClass();
  } else {
    finishHandler();
  }
};
const removeClass = () => {
  answerList.forEach((button) => {
    button.className = "answer-txt";
  });
};
const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("end.html");
};

window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
