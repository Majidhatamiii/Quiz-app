const score = JSON.parse(localStorage.getItem("score"));
const hightScore = JSON.parse(localStorage.getItem("hightScore")) || [];

const scoreElm = document.querySelector("p");
const button = document.querySelector("button");
const input = document.querySelector("input");

scoreElm.innerText = score;

const saveHandler = () => {
  if (!input.value) {
    alert("Please Enter Username!");
  } else if (!score) {
    alert("No Score To save!");
  } else {
    const finalScore = { Username: input.value, score };
    hightScore.push(finalScore);
    hightScore.sort((a, b) => b.score - a.Score);
    hightScore.splice(10);
    localStorage.setItem("hightScore", JSON.stringify(hightScore));
    localStorage.removeItem("score");
    window.location.assign("./index.html");
  }
};

button.addEventListener("click", saveHandler);
