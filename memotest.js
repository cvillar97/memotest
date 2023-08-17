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
  const colors = [
    "#ffff1c", //yellow
    "#ff0000", //red
    "#0000ff", //blue
    "#008000", //green
    "#ffa500", //orange
    "#87ceeb", //skyblue
  ];

  let colorsIndex = [];

  let j = 0;

  while (j < colors.length) {
    colorsIndex.push(j);
    j++;
  }

}

function generateRandomNumber(max) {
  const randomNumber = Math.floor(Math.random() * max);

  return randomNumber;
}
