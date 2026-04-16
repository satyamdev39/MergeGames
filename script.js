const size = 4;
let board = [];

// Initialize board
function init() {
    board = Array(size).fill().map(() => Array(size).fill(0));
    addNumber();
    addNumber();
    draw();
}

// Add new number
function addNumber() {
    let empty = [];
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (board[r][c] === 0) empty.push({r, c});
        }
    }
    if (empty.length === 0) return;

    let {r, c} = empty[Math.floor(Math.random() * empty.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
}

// Draw board
function draw() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    board.forEach(row => {
        row.forEach(val => {
            const cell = document.createElement("div");
            cell.className = "cell";

            if (val) {
                cell.textContent = val;
                cell.classList.add("v" + val);
            }

            grid.appendChild(cell);
        });
    });
}

// Slide + merge logic
function slide(row) {
    row = row.filter(v => v);

    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
        }
    }

    return row.filter(v => v).concat(Array(size).fill(0)).slice(0, size);
}

// Rotate board
function rotate() {
    let newBoard = Array(size).fill().map(() => Array(size).fill(0));

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            newBoard[c][size - 1 - r] = board[r][c];
        }
    }

    board = newBoard;
}

// Move handler
function move(dir) {
    let old = JSON.stringify(board);

    for (let i = 0; i < dir; i++) rotate();

    for (let r = 0; r < size; r++) {
        board[r] = slide(board[r]);
    }

    for (let i = 0; i < (4 - dir) % 4; i++) rotate();

    if (JSON.stringify(board) !== old) {
        addNumber();
        draw();
    }
}

// Controls
document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") move(0);
    if (e.key === "ArrowUp") move(1);
    if (e.key === "ArrowRight") move(2);
    if (e.key === "ArrowDown") move(3);
});

// Start game
init();