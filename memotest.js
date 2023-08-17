const $remainingCoincidences = document.querySelector("#coincidences");
const $status = document.querySelector("#status");
const $startbutton = document.querySelector("#start-button");

const $squares = document.querySelectorAll(".square");
function selectRandomSquares() {
  let squaresIndex = [];
  let i = 0;
  let randomSquares = [];

  $squares.forEach(function ($square) {
    squaresIndex.push(i);
    i++;
  });

  while (squaresIndex.length > 0) {
    const randomIndex = generateRandomNumber(squaresIndex.length);
    const selectedSquare = $squares[squaresIndex[randomIndex]];

    randomSquares.push(selectedSquare);
    squaresIndex.splice(randomIndex, 1);
  }

  return randomSquares;
}

function asignRandomColors(squares) {
}

function generateRandomNumber(max) {
  const randomNumber = Math.floor(Math.random() * max);

  return randomNumber;
}
