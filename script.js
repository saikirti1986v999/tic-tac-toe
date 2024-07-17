let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function startNewGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    displayBoard();
    document.getElementById('result-screen').style.display = 'none';

    // If the first move is made by the AI, uncomment the line below
    // makeAIMove();
}

function cellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        checkWin();
        checkDraw();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        displayBoard();

        // Make AI move after player's move with a delay
        if (currentPlayer === 'O' && gameActive) {
            setTimeout(() => makeAIMove(), 500); // 500 milliseconds delay
        }
    }
}

function makeAIMove() {
    const bestMove = getBestMove();
    gameBoard[bestMove] = 'O';
    currentPlayer = 'X';
    displayBoard();
    checkWin();
    checkDraw();
}

function getBestMove() {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = 'O';
            let score = minimax(gameBoard, 0, false);
            gameBoard[i] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

function minimax(board, depth, isMaximizing) {
    const scores = {
        X: -1,
        O: 1,
        draw: 0
    };

    const result = checkGameResult();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            displayResult(`${gameBoard[a]} wins!`);
            gameActive = false;
            return;
        }
    }
}

function checkDraw() {
    if (!gameBoard.includes('') && gameActive) {
        displayResult('It\'s a draw!');
        gameActive = false;
    }
}

function checkGameResult() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return gameBoard.includes('') ? null : 'draw';
}

function displayResult(message) {
    const resultMessageElement = document.getElementById('result-message');
    resultMessageElement.textContent = message;
    document.getElementById('result-screen').style.display = 'flex';
}

function displayBoard() {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';

    gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = value;
        cell.onclick = () => cellClick(index);
        boardElement.appendChild(cell);
    });
}

// Initial setup
startNewGame();
