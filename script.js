function startGame() {
  const boxes = document.querySelectorAll(".box");
  const scoreXp = document.querySelector(".score-one");
  const scoreOp = document.querySelector(".score-two");

  let currentSymbol = true;
  let gameGoing = true;
  let scoreX = 0;
  let scoreO = 0;

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function placeSymbol() {
    boxes.forEach((box) => box.addEventListener("click", handleBoxClick));
  }

  function handleBoxClick(e) {
    const box = e.target;
    if (!gameGoing || box.textContent !== "") return;

    box.textContent = currentSymbol ? "X" : "O";
    box.classList.add(currentSymbol ? "blue" : "red");

    currentSymbol = !currentSymbol;
    checkWinner();
  }

  function checkWinner() {
    const board = Array.from(boxes).map((box) => box.textContent);

    for (let [a, b, c] of winningCombos) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        handleWin(board[a]);
        return;
      }
    }

    if (board.every((cell) => cell !== "")) {
      handleDraw();
    }
  }

  function handleWin(player) {
    alert(`${player} is the Winner!`);
    gameGoing = false;

    if (player === "X") scoreX++;
    else scoreO++;

    updateScoreDisplay();
  }

  function handleDraw() {
    alert("It's a draw. Board reset.");
    resetGameBoard();
  }

  function resetGameBoard() {
    gameGoing = true;
    currentSymbol = true;
    boxes.forEach((box) => {
      box.textContent = "";
      box.classList.remove("blue", "red");
    });
  }

  function resetScores() {
    scoreX = 0;
    scoreO = 0;
    updateScoreDisplay();
  }

  function updateScoreDisplay() {
    scoreXp.textContent = `X = ${scoreX}`;
    scoreOp.textContent = `O = ${scoreO}`;
  }

  function addResetListeners() {
    document
      .getElementById("reset-board")
      .addEventListener("click", resetGameBoard);
    document
      .getElementById("reset-score")
      .addEventListener("click", resetScores);
  }

  // Init
  placeSymbol();
  addResetListeners();
}

startGame();