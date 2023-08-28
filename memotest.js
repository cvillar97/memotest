const $remainingCoincidences = document.querySelector("#coincidences");
const $status = document.querySelector("#status");
const $startButton = document.querySelector("#start-button");
const $restartButton = document.querySelector("#restart-button");

const $squares = document.querySelectorAll(".square");
const numberOfComparableSquares = 2;
let selectedSquares = [];
let remainingCoincidences = $squares.length / numberOfComparableSquares;

blockUserInput();

let realColors = [];

$startButton.onclick = function () {
  remainingCoincidences = $squares.length / numberOfComparableSquares;
  updateTextContent($remainingCoincidences, remainingCoincidences);
  updateTextContent($status, "");
  const randomSquares = selectRandomSquares();
  asignRandomColors(randomSquares);
  saveAssignedColors();
  hideColors();
  handleTransitionProperty("background-color 500ms, opacity 500ms");
  unlockUserInput();
  $startButton.disabled = true;
  changeElementOpacity($startButton, 0);
  $restartButton.disabled = false;
  changeElementOpacity($restartButton, 1);
};

$restartButton.onclick = function () {
  selectedSquares = [];
  realColors = [];
  updateTextContent($remainingCoincidences, "-");
  updateTextContent($status, "Press start to play");
  restoreInitialSquares();
  blockUserInput();
  $restartButton.disabled = true;
  changeElementOpacity($restartButton, 0);
  $startButton.disabled = false;
  changeElementOpacity($startButton, 1);
};

function handleUserInput(e) {
  const $square = e.target;
  const squareId = $square.id;
  selectedSquares.push($square);
  changeClassName($square, "selected-square");
  showRealColor($square, squareId);

  const COMPARISON_MS = 500;

  if (selectedSquares.length < numberOfComparableSquares) {
    unlockUserInput();
  } else if (selectedSquares.length === numberOfComparableSquares) {
    blockUserInput();

    const notTheSameId = selectedSquares[0].id !== selectedSquares[1].id;
    const success =
      selectedSquares[0].style.backgroundColor ===
        selectedSquares[1].style.backgroundColor && notTheSameId;

    if (success) {
      selectedSquares.forEach(function (square) {
        changeClassName(square, "success-square");
        setTimeout(function () {
          square.style.opacity = "0";
        }, COMPARISON_MS);
      });

      remainingCoincidences--;
      updateTextContent($remainingCoincidences, remainingCoincidences);
      unlockUserInput();
      selectedSquares = [];
      const allCoincidencesFound = remainingCoincidences === 0;
      if (allCoincidencesFound) {
        updateTextContent(
          $status,
          "Congratulations!! You found all the coincidences!!"
        );
      }
    } else if (!success) {
      selectedSquares.forEach(function (square) {
        changeClassName(square, "square");
        setTimeout(function () {
          square.style.backgroundColor = "rgb(47, 79, 79)";
        }, COMPARISON_MS);
      });

      selectedSquares = [];
      unlockUserInput();
    }
  }
}

function restoreInitialSquares() {
  const squares = document.querySelectorAll(
    "div.selected-square, div.success-square"
  );

  squares.forEach(function (square) {
    changeClassName(square, "square");
  });

  handleTransitionProperty("");
  squares.forEach(function (square) {
    changeElementOpacity(square, 1);
  });

  hideColors();
}

function showRealColor(square, id) {
  square.style.backgroundColor = realColors[id];
}

function changeElementOpacity(element, opacity) {
  element.style.opacity = opacity;
}

function updateTextContent(element, text) {
  element.textContent = text;
}

function changeClassName(square, newClass) {
  square.className = newClass;
}

function unlockUserInput() {
  document.querySelectorAll(".square").forEach(function (square) {
    if (!square.classList.contains("selected-square")) {
      square.onclick = handleUserInput;
    }
  });
}

function blockUserInput() {
  const squares = document.querySelectorAll(".square");
  squares.forEach(function (square) {
    square.onclick = function () {};
  });
}

function handleTransitionProperty(property) {
  let squares = document.querySelectorAll(".square");

  squares.forEach(function (square) {
    square.style.transition = property;
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
