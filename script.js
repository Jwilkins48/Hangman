const answers = [
  "spooky",
  "halloween",
  "pumpkin-patch",
  "skeleton",
  "haunted-mansion",
  "cauldron",
  "tombstone",
  "hocus-pocus",
  "ghost",
  "graveyard",
  "cobweb",
  "witchcraft",
];
const againBtn = document.getElementById("playAgain");
const playAgainContainer = document.getElementById("playAgain");
const answer = document.getElementById("answer");
const lives = document.getElementById("lives");
const alphabetContainer = document.getElementById("alphabetContainer");
const revealAnswer = document.getElementById("revealAnswer");

let currentAnswer = "";
let answerSplit;
let Includes = false;
let counter = 0;
let correctGuesses = [];
let currentGuess;
let life;
let alphabet;
let guess;
let disabled = false;

const createBoard = () => {
  // DEFAULT INFO
  currentAnswer = answers[Math.floor(Math.random() * answers.length)];
  answerSplit = currentAnswer.split("");
  life = 10;
  lives.innerHTML = `Lives Remaining: ${life}`;

  // DISPLAY CHOICES
  alphabet = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) => `<button id=${letter} class='alphabetBtn'>${letter}</button>`
    )
    .join("");
  alphabetContainer.innerHTML = alphabet;

  // DISPLAY CENSORED ANSWER
  for (let i = 0; i < currentAnswer.length; i++) {
    guess = document.createElement("p");
    guess.setAttribute("id", `guess${i}`);
    guess.setAttribute("class", `guess`);
    if (answerSplit[i] !== "-") {
      guess.innerHTML = "__";
    } else {
      guess.innerHTML = "-";
      counter += 1;
    }
    answer.appendChild(guess);
  }
};

alphabetContainer.addEventListener("click", (e) => {
  currentGuess = e.target.id;
  let letters = document.getElementById(e.target.id);
  Includes = answerSplit.includes(currentGuess);

  //Reveal correct letter
  for (let i = 0; i < currentAnswer.length; i++) {
    let g = document.getElementById(`guess${i}`);
    if (answerSplit[i] === currentGuess) {
      g.innerHTML = currentGuess;
      counter += 1;
    }
  }

  const outcome = (outcome) => {
    if (outcome === "Lose") {
      life = 0;
      lives.innerHTML = `Lives Remaining: ${life}`;
      revealAnswer.innerHTML = currentAnswer;
      revealAnswer.classList.remove("hidden");
    }

    alphabetContainer.classList.add("disabled");
    againBtn.classList.remove("hidden");
  };

  //Change button color if correct
  if (Includes === true) {
    letters.classList.add("correct");
    if (counter === currentAnswer.length) {
      outcome("Win");
    }
  } else {
    letters.classList.add("incorrect");
    letters.disabled = true;
    //Remove Life
    if (life <= 1) {
      outcome("Lose");
    } else {
      life -= 1;
      lives.innerHTML = `Lives Remaining: ${life}`;
    }
  }
});

againBtn.addEventListener("click", () => location.reload());

window.onload = createBoard();
