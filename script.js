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
const canvas = document.getElementById("hangman");
const context = canvas.getContext("2d");

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
  life = 9;
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

//DRAW HANGMAN
Draw = (part) => {
  switch (part) {
    case "gallows":
      context.strokeStyle = "#444";
      context.lineWidth = 10;
      context.beginPath();
      context.moveTo(175, 225);
      context.lineTo(5, 225);
      context.moveTo(40, 225);
      context.lineTo(25, 5);
      context.lineTo(100, 5);
      context.lineTo(100, 25);
      context.stroke();
      break;

    case "head":
      context.lineWidth = 5;
      context.beginPath();
      context.arc(100, 50, 25, 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();
      break;

    case "body":
      context.beginPath();
      context.moveTo(100, 75);
      context.lineTo(100, 140);
      context.stroke();
      break;

    case "rightHarm":
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(60, 100);
      context.stroke();
      break;

    case "leftHarm":
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(140, 100);
      context.stroke();
      break;

    case "rightLeg":
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(80, 190);
      context.stroke();
      break;

    case "rightFoot":
      context.beginPath();
      context.moveTo(82, 190);
      context.lineTo(70, 185);
      context.stroke();
      break;

    case "leftLeg":
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(125, 190);
      context.stroke();
      break;

    case "leftFoot":
      context.beginPath();
      context.moveTo(122, 190);
      context.lineTo(135, 185);
      context.stroke();
      break;
  }
};
const draws = [
  "gallows",
  "head",
  "body",
  "rightHarm",
  "leftHarm",
  "rightLeg",
  "leftLeg",
  "rightFoot",
  "leftFoot",
];
var step = 0;

const addBody = () => {
  Draw(draws[step++]);
  if (undefined === draws[step]) this.disabled = true;
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
      addBody();
      outcome("Lose");
    } else {
      addBody();
      life -= 1;
      lives.innerHTML = `Lives Remaining: ${life}`;
    }
  }
});

againBtn.addEventListener("click", () => location.reload());
window.onload = createBoard();
