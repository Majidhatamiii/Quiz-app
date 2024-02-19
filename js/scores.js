const hightScore = JSON.parse(localStorage.getItem("hightScore")) || [];
const list = document.querySelector("ol");

const content = hightScore.map((score, index) => {
  return `
    <li>
        <span>${index + 1}</span>
        <p>${score.Username}</p>
        <span>${score.score}</span>
    </li>
    `;
});
console.log(content);
list.innerHTML = content.join("");
