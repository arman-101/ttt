const boxes = document.querySelectorAll(".box");
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
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      // check if box is empty, place "X" 1st, then switch to "O"
      if (gameGoing === true) {
        if (box.textContent == "") {
          if (currentSymbol === true) {
            currentSymbol = false;
            box.textContent = "X";
            box.classList.add("blue");
          } else {
            currentSymbol = true;
            box.textContent = "O";
            box.classList.add("red");
          }
          checkWinner();
        }
      }
    });
  });
}

function resetBoard() {
  const resetBoardBtn = document.getElementById("reset-board");

  resetBoardBtn.addEventListener("click", () => {
    gameGoing = true;
    currentSymbol = true;
    draw = false;

    boxes.forEach((box) => {
      box.textContent = "";
      box.classList.remove("red", "blue");
    });
    // alert("Board Reset");
  });

  const resetScorebtn = document.getElementById("reset-score");
  let scoreXp = document.querySelector(".score-one");
  let scoreOp = document.querySelector(".score-two");

  resetScorebtn.addEventListener("click", () => {
    scoreX = 0;
    scoreXp.textContent = `X = ${scoreX}`;
    scoreO = 0;
    scoreOp.textContent = `O = ${scoreO}`;
  })

}

function checkWinner() {
  const board = Array.from(boxes).map((box) => box.textContent);

  for (let combo of winningCombos) {
    const [a, b, c] = combo;

    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      alert(`${board[a]} is the Winner!`);
      gameGoing = false;

      let winner = board[a];
      if (winner === "X") {
        scoreX++;
        const scoreXp = document.querySelector(".score-one");
        scoreXp.textContent = `X = ${scoreX}`;
      } else {
        scoreO++;
        const scoreOp = document.querySelector(".score-two");
        scoreOp.textContent = `O = ${scoreO}`;
      }

      return;
    }

    if (board.every((cell) => cell !== "")) {
      alert("It's a draw. Board reset.");

      gameGoing = true;
      currentSymbol = true;
      draw = false;

      boxes.forEach((box) => {
        box.textContent = "";
        box.classList.remove("red", "blue");
      });

      return;
    }
  }
}

placeSymbol();
resetBoard();
