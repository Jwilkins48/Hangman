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
  alphabet = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) => `<button id=${letter} class='alphabetBtn'>${letter}</button>`
    )
    .join("");
  //display buttons
  alphabetContainer.innerHTML = alphabet;
  console.log(answerSplit);
  // DISPLAYED ANSWER
  for (let i = 0; i < currentAnswer.length; i++) {
    guess = document.createElement("p");
    guess.setAttribute("id", `guess${i}`);
    if (answerSplit[i] !== "-") {
      guess.innerHTML = "__";
    } else {
      guess.innerHTML = "-";
    }
    answer.appendChild(guess);
  }
};

//Change button color if correct
alphabetContainer.addEventListener("click", (e) => {
  currentGuess = e.target.id;
  let letters = document.getElementById(e.target.id);
  Includes = answerSplit.includes(currentGuess);
  console.log(Includes);

  if (Includes === true) {
    letters.classList.add("correct");
  } else {
    letters.classList.add("incorrect");
  }

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
