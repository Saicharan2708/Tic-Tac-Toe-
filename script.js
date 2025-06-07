let arr = Array(9).fill(null);
let current = "X";
let gameOver = false;

function MyGame(blk) {
    const id = Number(blk.id);
    if (arr[id] !== null || gameOver) return;

    arr[id] = current;
    blk.innerText = current;
    blk.classList.add(current.toLowerCase()); // Apply color class

    const winPattern = checkWinner();
    if (winPattern) {
        document.getElementById("result").innerText = `Winner is: ${current}`;
        gameOver = true;

        // Highlight winning cells
        winPattern.forEach(index => {
            const cell = document.getElementById(index.toString());
            cell.classList.add("winning");
        });

        return;
    }

    if (!arr.some(e => e === null)) {
        document.getElementById("result").innerText = "It's a Draw!";
        gameOver = true;
        return;
    }

    current = current === "X" ? "O" : "X";
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [6, 4, 2]             // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (arr[a] !== null && arr[a] === arr[b] && arr[b] === arr[c]) {
            return pattern;
        }
    }
    return null;
}

function resetGame() {
    arr = Array(9).fill(null);
    current = "X";
    gameOver = false;
    document.getElementById("result").innerText = "";

    const cells = document.getElementsByClassName("col");
    for (let cell of cells) {
        cell.innerText = "";
        cell.classList.remove("x", "o", "winning");
    }
}
