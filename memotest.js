const $remainingCoincidences = document.querySelector("#coincidences");
const $status = document.querySelector("#status");
const $startbutton = document.querySelector("#start-button");

const $squares = document.querySelectorAll(".square");
const numberOfComparableSquares = 2;
let selectedSquares = [];

blockUserInput();

const realColors = [];

$startbutton.onclick = function () {
  const randomSquares = selectRandomSquares();
  asignRandomColors(randomSquares);
  saveAssignedColors();
  hideColors();
  assignTransitionProperty();
  unlockUserInput();
};

function showRealColor(square, id) {
  square.style.backgroundColor = realColors[id];
}

function handleUserInput(e) {
  const $square = e.target;
  const squareId = $square.id;
  selectedSquares.push($square);
  changeClassName($square, "selected-square");
  showRealColor($square, squareId);

  const COMPARISON_MS = 500;

  if (selectedSquares.length < numberOfComparableSquares) {
    unlockUserInput();
}

function unlockUserInput() {
  document.querySelectorAll(".square").forEach(function (square) {
    if (!square.classList.contains("selected-square")) {
      square.onclick = handleUserInput;
    }
  });
}

function blockUserInput(square) {
  $squares.forEach(function (square) {
    square.onclick = function () {};
  });
}

function assignTransitionProperty() {
  $squares.forEach(function (square) {
    square.style.transition = "background-color 500ms, opacity 500ms";
  });
}

function saveAssignedColors() {
  let squares = document.querySelectorAll(".square");
  squares.forEach(function (square) {
    let assignedColor = square.style.backgroundColor;
    realColors.push(assignedColor);
  });
}

function hideColors() {
  let squares = document.querySelectorAll(".square");
  squares.forEach(function (square) {
    square.style.backgroundColor = "rgb(47, 79, 79)";
  });
}

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

  let randomIndex = generateRandomNumber(colorsIndex.length);
  let selectedColor = colors[colorsIndex[randomIndex]];

  const numberOfSquaresPerColor = 2;

  let i = 0;

  squares.forEach(function (square) {
    if (i < numberOfSquaresPerColor) {
      square.style.backgroundColor = selectedColor;
      i++;
    } else {
      colorsIndex.splice(randomIndex, 1);
      randomIndex = generateRandomNumber(colorsIndex.length);
      selectedColor = colors[colorsIndex[randomIndex]];
      i = 0;
      square.style.backgroundColor = selectedColor;
      i++;
    }
  });
}

function generateRandomNumber(max) {
  const randomNumber = Math.floor(Math.random() * max);

  return randomNumber;
}
