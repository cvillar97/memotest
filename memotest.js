const $remainingCoincidences = document.querySelector("#coincidences");
const $status = document.querySelector("#status");
const $startbutton = document.querySelector("#start-button");

const $squares = document.querySelectorAll(".square");
function selectRandomSquares() {
  let squaresIndex = [];
  let i = 0;
  $squares.forEach(function ($square) {
    squaresIndex.push(i);
    i++;
  });
  return randomSquares;
}
function generateRandomNumber(max) {
  const randomNumber = Math.floor(Math.random() * max);

  return randomNumber;
}
