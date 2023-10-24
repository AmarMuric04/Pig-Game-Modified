let scores = [0, 0];

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

let current0El = document.getElementById("current--0");
let current1El = document.getElementById("current--1");
let score0El = document.getElementById("score--0");
let score1El = document.getElementById("score--1");
let diceImage = document.querySelector(".dice");
let activePlayer = 0;
let currentScore = 0;

diceImage.classList.add("hidden");

btnRoll.addEventListener("click", function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceImage.classList.remove("hidden");
  diceImage.src = `/dices/dice-${dice}-modified.png`;
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});
let timeoutId;
btnHold.addEventListener("click", function () {
  document.getElementById(`score--${activePlayer}`).textContent = scores[
    activePlayer
  ] += currentScore;
  if (scores[0] >= 100 || scores[1] >= 100) {
    document.getElementById(`score--${activePlayer}`).textContent = "You win";
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    btnHold.classList.add("hidden");
    btnRoll.classList.add("hidden");
    diceImage.classList.add("hidden");
    updateHTML("♕", "#d19d43", "", "#222");
  } else {
    if (currentScore !== 0) {
      switchPlayer();
    } else {
      timeout();
    }
  }
});

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

btnNew.addEventListener("click", function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  removeOrAddHidde("add", "remove");
  resetToZero(0);

  document.getElementById(`current--${activePlayer}`).style.color = "white";
  document.querySelector(`.current--${activePlayer}`).style.backgroundColor =
    "black";
  document.querySelector(`.current-label--${activePlayer}`).textContent =
    "CURRENT";

  activePlayer = 0;
});
function timeout() {
  clearTimeout(timeoutId);
  document.querySelector(".alert").classList.remove("hidden");
  document.querySelector(".alert1060").classList.remove("hidden1060");
  timeoutId = setTimeout(function () {
    document.querySelector(".alert").classList.add("hidden");
    document.querySelector(".alert1060").classList.add("hidden1060");
  }, 1000);
}

function removeOrAddHidde(add, remove) {
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  btnHold.classList.remove("hidden");
  btnRoll.classList.remove("hidden");
  diceImage.classList.add("hidden");
}
function resetToZero(a) {
  scores = [a, a];
  currentScore = a;
  score0El.textContent = a;
  score1El.textContent = a;
  current0El.textContent = a;
  current1El.textContent = a;
  document.getElementById(`score--${activePlayer}`).textContent = a;
  document.getElementById(`current--${activePlayer}`).textContent = a;
}
function updateHTML(a, b, c, d) {
  document.getElementById(`current--${activePlayer}`).textContent = a;
  document.getElementById(`current--${activePlayer}`).style.color = b;
  document.querySelector(`.current-label--${activePlayer}`).textContent = c;
  document.querySelector(`.current--${activePlayer}`).style.backgroundColor = d;
}
