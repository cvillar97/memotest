const $remainingCoincidences = document.querySelector("#coincidences");
const $status = document.querySelector("#status");
const $startbutton = document.querySelector("#start-button");

const $squares = document.querySelectorAll(".square");
function selectRandomSquares() {
  return randomSquares;
}
function generateRandomNumber(max) {
  const randomNumber = Math.floor(Math.random() * max);

  return randomNumber;
}
