const answers = [
  "spooky",
  "halloween",
  "pumpkin-patch",
  "skeleton",
  "haunted-mansion",
  "cauldron",
  "tombstone",
  "hocus-pocus",
];
const button = document.getElementById("btn");
const answer = document.getElementById("answer");
const lives = document.getElementById("lives");
const alphabetContainer = document.getElementById("alphabetContainer");

let currentAnswer = answers[Math.floor(Math.random() * answers.length)];
let answerSplit = currentAnswer.split("");
let Includes = false;
let guesses = [];
let currentGuess;
let life = 10;
let alphabet;
let guess;

const createBoard = () => {
  // DISPLAY CHOICES
  alphabet = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) => `<button id=${letter} class='alphabetBtn'>${letter}</button>`
    )
    .join("");
  alphabetContainer.innerHTML = alphabet;
  lives.innerHTML = `Lives Remaining: ${life}`;
  // DISPLAYED CENSORED ANSWER
  for (let i = 0; i < currentAnswer.length; i++) {
    guess = document.createElement("p");
    guess.setAttribute("id", `guess${i}`);
    guess.setAttribute("class", `guess`);
    if (answerSplit[i] !== "-") {
      guess.innerHTML = "__";
    } else {
      guess.innerHTML = "-";
    }
    answer.appendChild(guess);
  }
};

alphabetContainer.addEventListener("click", (e) => {
  currentGuess = e.target.id;
  let letters = document.getElementById(e.target.id);
  Includes = answerSplit.includes(currentGuess);
  console.log(Includes);
  //Change button color if correct
  if (Includes === true) {
    letters.classList.add("correct");
  } else {
    letters.classList.add("incorrect");
    //Remove Life
    if (life <= 1) {
      alert("You Lose!");
    } else {
      life -= 1;
      lives.innerHTML = `Lives Remaining: ${life}`;
    }
  }
  //Reveal correct letter
  for (let i = 0; i < currentAnswer.length; i++) {
    let g = document.getElementById(`guess${i}`);
    if (answerSplit[i] === currentGuess) {
      g.innerHTML = currentGuess;
    } else {
      console.log("no");
    }
  }
});

window.onload = createBoard();
