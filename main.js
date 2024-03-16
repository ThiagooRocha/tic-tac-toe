const tableColumn = document.querySelectorAll(".table__column");
const tableColumnRow = document.querySelectorAll(".table__column__row");
const playerBox = document.querySelectorAll(".player-box");

const playerBoxX = document.querySelector(".player--X");
const playerBoxO = document.querySelector(".player--O");

const btnReset = document.querySelector(".btn-reset");

let currentTurn = "X";

const checkSquare = (element) => {
  let dataElement = element.dataset.checked;

  if (dataElement == "false") {
    if (currentTurn === "X") {
      element.classList.remove("square--O");
      element.classList.add("square--X");

      element.textContent = currentTurn;

      changeTurn();
    } else {
      element.classList.remove("square--X");
      element.classList.add("square--O");

      element.textContent = currentTurn;

      changeTurn();
    }

    element.dataset.checked = "true";
  }

  return dataElement;
};

const changeTurn = () => {
  currentTurn === "X" ? (currentTurn = "O") : (currentTurn = "X");

  return currentTurn;
};

const playerTurn = () => {
  const iconX = document.querySelector(".player-X-icon");
  const scoreX = document.querySelector(".player-X-score");
  const iconO = document.querySelector(".player-O-icon");
  const scoreO = document.querySelector(".player-O-score");

  if (currentTurn === "X") {
    playerBoxX.classList.remove("player--disabled");
    iconX.classList.remove("icon--disabled");
    scoreX.classList.remove("score--disabled");

    playerBoxO.classList.add("player--disabled");
    iconO.classList.add("icon--disabled");
    scoreO.classList.add("score--disabled");
  } else {
    playerBoxO.classList.remove("player--disabled");
    iconO.classList.remove("icon--disabled");
    scoreO.classList.remove("score--disabled");

    playerBoxX.classList.add("player--disabled");
    iconX.classList.add("icon--disabled");
    scoreX.classList.add("score--disabled");
  }
};

const clearStyles = (element, arrClass) => {
    console.log(element, arrClass)
};

btnReset.addEventListener('click', () => {
    tableColumnRow.forEach(row => {
        row.dataset.checked = "false";
        row.textContent = "";
        currentTurn = "X";
        playerTurn()
    })
})

tableColumnRow.forEach((row) => {
  playerTurn();

  row.addEventListener("click", (e) => {
    checkSquare(e.currentTarget);
    playerTurn();
  });
});
