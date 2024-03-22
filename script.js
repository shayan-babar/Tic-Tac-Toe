const squares = document.querySelectorAll('.square');
const message = document.querySelectorAll('#message');
const resetButton = document.querySelector('#reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function checkWinner() {
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],

    ];
    for (const comb of winCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            message.innerText = `${gameBoard[a]} has wins!`;
            return;
        }
    }
    if (!gameBoard.includes('')) {
        gameOver = true;
        message.innerText = "It's a draw!"
    }
}
function makeMove(index) {
    if (!gameBoard[index] && !gameOver) {
        gameBoard[index] = currentPlayer;
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        checkWinner();
    }
}
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        makeMove(i);

        if (!gameOver && currentPlayer === 'o') {
            const emptySquares = gameBoard.reduce((acc, value, index) => {
                if (!value) acc.push(index);
                return;
            }, []);
            const randomIndex = emptySquares[Match.floor(Match.random() * emptySquares.length)];
            makeMove(randomIndex);
        }
    })
}

resetButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'x';
    message.innerText = '';
    squares.forEach(square => square.textContent = '');
});
