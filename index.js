// const cells = document.querySelectorAll(".cell");
// const statusText = document.querySelector("#statusText");
// const restartBtn = document.querySelector("#restartBtn");
// const winLine = document.querySelector("#winLine");

// const winConditions = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ];

// let options = ["", "", "", "", "", "", "", "", ""];
// let currentPlayer = "X";
// let running = false;

// initializeGame();

// function initializeGame() {
//     cells.forEach(cell => cell.addEventListener("click", cellClicked));
//     restartBtn.addEventListener("click", restartGame);

//     statusText.textContent = `${currentPlayer}'s turn`;
//     running = true;
// }

// function cellClicked() {
//     const cellIndex = this.getAttribute("cellIndex");

//     if (options[cellIndex] != "" || !running) {
//         return;
//     }

//     updateCell(this, cellIndex);
//     checkWinner();
// }

// function updateCell(cell, index) {
//     options[index] = currentPlayer;
//     cell.textContent = currentPlayer;
// }

// function changePlayer() {
//     currentPlayer = (currentPlayer == "X") ? "O" : "X";
//     statusText.textContent = `${currentPlayer}'s turn`;
// }

// function checkWinner() {

//     let roundWon = false;
//     let winningCondition = null;

//     for (let i = 0; i < winConditions.length; i++) {

//         const condition = winConditions[i];

//         const cellA = options[condition[0]];
//         const cellB = options[condition[1]];
//         const cellC = options[condition[2]];

//         if (cellA == "" || cellB == "" || cellC == "") {
//             continue;
//         }

//         if (cellA == cellB && cellB == cellC) {

//             roundWon = true;
//             winningCondition = condition;

//             break;
//         }
//     }

//     if (roundWon) {

//         statusText.textContent = `${currentPlayer} wins!`;

//         running = false;

//         drawWinLine(winningCondition);
//     }

//     else if (!options.includes("")) {

//         statusText.textContent = `تعادل`;

//         running = false;
//     }

//     else {

//         changePlayer();
//     }
// }

// function drawWinLine(condition) {

//     winLine.style.display = "block";

//     // Top row
//     if (condition[0] === 0 && condition[1] === 1) {

//         winLine.style.width = "225px";
//         winLine.style.left = "0px";
//         winLine.style.top = "37px";
//         winLine.style.transform = "rotate(0deg)";
//     }

//     // Middle row
//     else if (condition[0] === 3 && condition[1] === 4) {

//         winLine.style.width = "225px";
//         winLine.style.left = "0px";
//         winLine.style.top = "112px";
//         winLine.style.transform = "rotate(0deg)";
//     }

//     // Bottom row
//     else if (condition[0] === 6 && condition[1] === 7) {

//         winLine.style.width = "225px";
//         winLine.style.left = "0px";
//         winLine.style.top = "187px";
//         winLine.style.transform = "rotate(0deg)";
//     }

//     // Left column
//     else if (condition[0] === 0 && condition[1] === 3) {

//         winLine.style.width = "225px";
//         winLine.style.left = "-75px";
//         winLine.style.top = "112px";
//         winLine.style.transform = "rotate(90deg)";
//     }

//     // Middle column
//     else if (condition[0] === 1 && condition[1] === 4) {

//         winLine.style.width = "225px";
//         winLine.style.left = "0px";
//         winLine.style.top = "112px";
//         winLine.style.transform = "rotate(90deg)";
//     }

//     // Right column
//     else if (condition[0] === 2 && condition[1] === 5) {

//         winLine.style.width = "225px";
//         winLine.style.left = "75px";
//         winLine.style.top = "112px";
//         winLine.style.transform = "rotate(90deg)";
//     }

//     // Diagonal: top-left → bottom-right
//     else if (condition[0] === 0 && condition[1] === 4) {

//         winLine.style.width = "318px";
//         winLine.style.left = "-47px";
//         winLine.style.top = "110px";
//         winLine.style.transform = "rotate(45deg)";
//     }

//     // Diagonal: top-right → bottom-left
//     else if (condition[0] === 2 && condition[1] === 4) {

//         winLine.style.width = "318px";
//         winLine.style.left = "-47px";
//         winLine.style.top = "110px";
//         winLine.style.transform = "rotate(-45deg)";
//     }
// }

// function restartGame() {

//     currentPlayer = "X";

//     options = ["", "", "", "", "", "", "", "", ""];

//     statusText.textContent = `${currentPlayer}'s turn`;

//     cells.forEach(cell => cell.textContent = "");

//     // Hide the winning line
//     winLine.style.display = "none";

//     running = true;
// }
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winLine = document.querySelector("#winLine");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let computerThinking = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);

    statusText.textContent = "Your turn (X)";
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (
        options[cellIndex] !== "" ||
        !running ||
        computerThinking
    ) {
        return;
    }

    options[cellIndex] = "X";
    this.textContent = "X";

    if (checkWinner()) {
        return;
    }

    computerThinking = true;
    statusText.textContent = "Computer's turn...";

    setTimeout(computerMove, 500);
}

function computerMove() {

    if (!running) {
        computerThinking = false;
        return;
    }

    let move = findWinningMove("O");

    if (move === -1) {
        move = findWinningMove("X");
    }

    if (move === -1 && options[4] === "") {
        move = 4;
    }

    if (move === -1) {
        const corners = [0, 2, 6, 8].filter(
            index => options[index] === ""
        );

        if (corners.length > 0) {
            move = corners[
                Math.floor(Math.random() * corners.length)
            ];
        }
    }

    if (move === -1) {
        const emptyCells = [];

        for (let i = 0; i < options.length; i++) {
            if (options[i] === "") {
                emptyCells.push(i);
            }
        }

        if (emptyCells.length > 0) {
            move = emptyCells[
                Math.floor(Math.random() * emptyCells.length)
            ];
        }
    }

    if (move !== -1) {
        options[move] = "O";
        cells[move].textContent = "O";
    }

    computerThinking = false;

    if (checkWinner()) {
        return;
    }

    statusText.textContent = "Your turn (X)";
}

function findWinningMove(player) {

    for (let i = 0; i < winConditions.length; i++) {

        const condition = winConditions[i];

        const a = condition[0];
        const b = condition[1];
        const c = condition[2];

        if (
            options[a] === player &&
            options[b] === player &&
            options[c] === ""
        ) {
            return c;
        }

        if (
            options[a] === player &&
            options[c] === player &&
            options[b] === ""
        ) {
            return b;
        }

        if (
            options[b] === player &&
            options[c] === player &&
            options[a] === ""
        ) {
            return a;
        }
    }

    return -1;
}

function checkWinner() {

    let roundWon = false;
    let winningCondition = null;

    for (let i = 0; i < winConditions.length; i++) {

        const condition = winConditions[i];

        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (
            cellA === "" ||
            cellB === "" ||
            cellC === ""
        ) {
            continue;
        }

        if (
            cellA === cellB &&
            cellB === cellC
        ) {
            roundWon = true;
            winningCondition = condition;
            break;
        }
    }

    if (roundWon) {

        statusText.textContent =
            currentPlayer === "X"
                ? "You win! 🎉"
                : "Computer wins! 🤖";

        running = false;

        drawWinLine(winningCondition);

        return true;
    }

    if (!options.includes("")) {

        statusText.textContent = "تعادل";

        running = false;

        return true;
    }

    currentPlayer =
        currentPlayer === "X" ? "O" : "X";

    return false;
}

function drawWinLine(condition) {

    winLine.style.display = "block";

    if (condition[0] === 0 && condition[1] === 1) {

        winLine.style.width = "225px";
        winLine.style.left = "0px";
        winLine.style.top = "37px";
        winLine.style.transform = "rotate(0deg)";
    }

    else if (condition[0] === 3 && condition[1] === 4) {

        winLine.style.width = "225px";
        winLine.style.left = "0px";
        winLine.style.top = "112px";
        winLine.style.transform = "rotate(0deg)";
    }

    else if (condition[0] === 6 && condition[1] === 7) {

        winLine.style.width = "225px";
        winLine.style.left = "0px";
        winLine.style.top = "187px";
        winLine.style.transform = "rotate(0deg)";
    }

    else if (condition[0] === 0 && condition[1] === 3) {

        winLine.style.width = "225px";
        winLine.style.left = "-75px";
        winLine.style.top = "112px";
        winLine.style.transform = "rotate(90deg)";
    }

    else if (condition[0] === 1 && condition[1] === 4) {

        winLine.style.width = "225px";
        winLine.style.left = "0px";
        winLine.style.top = "112px";
        winLine.style.transform = "rotate(90deg)";
    }

    else if (condition[0] === 2 && condition[1] === 5) {

        winLine.style.width = "225px";
        winLine.style.left = "75px";
        winLine.style.top = "112px";
        winLine.style.transform = "rotate(90deg)";
    }

    else if (condition[0] === 0 && condition[1] === 4) {

        winLine.style.width = "318px";
        winLine.style.left = "-47px";
        winLine.style.top = "110px";
        winLine.style.transform = "rotate(45deg)";
    }

    else if (condition[0] === 2 && condition[1] === 4) {

        winLine.style.width = "318px";
        winLine.style.left = "-47px";
        winLine.style.top = "110px";
        winLine.style.transform = "rotate(-45deg)";
    }
}

function restartGame() {

    currentPlayer = "X";
    computerThinking = false;

    options = ["", "", "", "", "", "", "", "", ""];

    statusText.textContent = "Your turn (X)";

    cells.forEach(cell => {
        cell.textContent = "";
    });

    winLine.style.display = "none";

    running = true;
}

