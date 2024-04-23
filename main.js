function initGame() {
  let turnPlayer = "X";
  let score = {
    X: 0,
    O: 0,
  };
  let virtualTable = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const tableSquares = document.querySelectorAll(".table__row__square");

  const playerX = document.querySelector(".player--X");
  const playerXScore = document.querySelector(".player-X-score");
  const playerXIcon = document.querySelector(".player-X-icon")

  const playerO = document.querySelector(".player--O");
  const playerOScore = document.querySelector(".player-O-score");
  const playerOIcon = document.querySelector(".player-O-icon")
  
  const drawContainer = document.querySelector(".draw__container")
  const resetGameBtn = document.querySelector("#resetGame-btn");

  tableSquares.forEach((square) => {
    square.addEventListener("click", (e) => {
      markSquare(e.currentTarget, turnPlayer);
    });
  });

  const markSquare = (element, turnPlayer) => {
    if (element.dataset.checked !== "true") {
      element.dataset.checked = "true";

      let row = element.dataset.index.slice(0, 1);
      let col = element.dataset.index.slice(2, 3);

      element.classList.add(`square--${turnPlayer}`);
      element.textContent = turnPlayer;
      virtualTable[row][col] = turnPlayer;


      if (!winsConditinos() && !checkDraw()) {
        changeTurn();
      }
    }
  };

  const changeTurn = () => {
    console.log("TURN")

    playerO.classList.add("player--disabled");
    playerOScore.classList.add("score--disabled");
    playerOIcon.classList.add("icon--disabled");


    playerX.classList.remove("player--disabled");
    playerXScore.classList.remove("score--disabled");
    playerXIcon.classList.remove("icon--disabled");

    if (turnPlayer == "X") {
      playerX.classList.add("player--disabled");
      playerXScore.classList.add("score--disabled");
      playerXIcon.classList.add("icon--disabled");

      playerO.classList.remove("player--disabled");
      playerOScore.classList.remove("score--disabled");
      playerOIcon.classList.remove("icon--disabled");



      return (turnPlayer = "O");
    }

    return (turnPlayer = "X");
  };

  const winsConditinos = () => {
    //check rows
    for (let i = 0; i < 3; i++) {
      if (
        virtualTable[i][0] !== "" &&
        virtualTable[i][0] === virtualTable[i][1] &&
        virtualTable[i][0] === virtualTable[i][2]
      ) {
        document.querySelector(`[data-index="${i}-0"]`).classList.add('row-line');

        document.querySelector(`.player--${turnPlayer}`).classList.add("player--winner")
        document.querySelector(`.player-${turnPlayer}-score`).classList.add("lightBeam");
        document.querySelector(`.player--${turnPlayer}`).classList.add("lightBeam");

        addScorePoint();
        disabledSquares();
        return true;
      }
    }

    //check columns
    for (let i = 0; i < 3; i++) {
      if (
        virtualTable[0][i] !== "" &&
        virtualTable[0][i] === virtualTable[1][i] &&
        virtualTable[0][i] === virtualTable[2][i]
      ) {
        document.querySelector(`[data-index="0-${i}"]`).classList.add('column-line');
        
        document.querySelector(`.player--${turnPlayer}`).classList.add("player--winner")
        document.querySelector(`.player-${turnPlayer}-score`).classList.add("lightBeam");
        document.querySelector(`.player--${turnPlayer}`).classList.add("lightBeam");

        addScorePoint();
        disabledSquares();
        return true;
      }
    }

    //check diagonals
    if (
      virtualTable[0][0] !== "" &&
      virtualTable[0][0] === virtualTable[1][1] &&
      virtualTable[0][0] === virtualTable[2][2]
    ) {
      document.querySelector(`[data-index="0-0"]`).classList.add("diagonalLeft-line");
      
      document.querySelector(`.player--${turnPlayer}`).classList.add("player--winner")
      document.querySelector(`.player-${turnPlayer}-score`).classList.add("lightBeam");
      document.querySelector(`.player--${turnPlayer}`).classList.add("lightBeam");

      addScorePoint();
      disabledSquares();
      return true;
    }

    if (
      virtualTable[0][2] !== "" &&
      virtualTable[0][2] === virtualTable[1][1] &&
      virtualTable[0][2] === virtualTable[2][0]
    ) {
      document.querySelector(`[data-index="0-2"]`).classList.add('diagonalRight-line');
      
      document.querySelector(`.player--${turnPlayer}`).classList.add("player--winner")
      document.querySelector(`.player-${turnPlayer}-score`).classList.add("lightBeam");
      document.querySelector(`.player--${turnPlayer}`).classList.add("lightBeam");

      addScorePoint();
      disabledSquares();
      return true;
    }
  };

  const disabledSquares = () => {
    tableSquares.forEach((square) => {
      square.classList.add(`square--disabled`);
    });
  };

  const checkDraw = () => {
    const row1 =
      virtualTable[0][0] != "" &&
      virtualTable[0][1] != "" &&
      virtualTable[0][2] != "";
    const row2 =
      virtualTable[1][0] != "" &&
      virtualTable[1][1] != "" &&
      virtualTable[1][2] != "";
    const row3 =
      virtualTable[2][0] != "" &&
      virtualTable[2][1] != "" &&
      virtualTable[2][2] != "";

    if (row1 && row2 && row3) {
      disabledSquares();
      removeStyles();

      playerX.classList.add("player--disabled");
      playerXScore.classList.add("score--disabled");
      playerXIcon.classList.add("icon--disabled");

      playerO.classList.add("player--disabled");
      playerOScore.classList.add("score--disabled");
      playerOIcon.classList.add("icon--disabled");

      drawContainer.classList.add("vissible")

      return true;
    }
  };

  const addScorePoint = () => {
    if (turnPlayer == "X") {
      score.X += 1;
      playerXScore.textContent = score.X;
    } else {
      score.O += 1;
      playerOScore.textContent = score.O;
    }
  };

  const resetGame = () => {
    virtualTable = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    tableSquares.forEach((square) => {
      square.dataset.checked = "false";
      square.textContent = "";
      square.classList.remove(`square--X`) ||
      square.classList.remove(`square--O`);
      square.classList.remove(`square--disabled`);
      square.classList.remove('row-line');
      square.classList.remove('column-line');
      square.classList.remove('diagonalLeft-line');
      square.classList.remove('diagonalRight-line');
    });
    removeStyles();
    turnPlayer = "X";
  };

  const removeStyles = () => {
    drawContainer.classList.remove("vissible")

    playerX.classList.remove("player--disabled");
    playerX.classList.remove("player--winner");
    playerX.classList.remove("lightBeam");
    playerXScore.classList.remove("score--disabled");
    playerXScore.classList.remove("lightBeam");
    playerXIcon.classList.remove("icon--disabled");

    playerO.classList.remove("player--disabled");
    playerO.classList.remove("player--winner");
    playerO.classList.remove("lightBeam");
    playerOScore.classList.remove("score--disabled");
    playerOScore.classList.remove("lightBeam");
    playerOIcon.classList.remove("icon--disabled");
  }

  resetGameBtn.addEventListener("click", resetGame);
}

initGame();
