/*---------------------------- Variables (state) ----------------------------*/
let board = []
let turn
let winner
let tie

/*------------------------ Cached Element References ------------------------*/
let squareEls = document.querySelectorAll(".sqr")
let messageEl = document.querySelector('#message')
let resetBtn = document.querySelector('#reset-btn')

/*-------------------------------- Functions --------------------------------*/
function init() {
    board = Array(9).fill(' ')
    turn = 1
    winner = false
    tie = false
    messageEl.textContent = "Player X's turn"
    render()
}

function checkWinner(currentPlayer) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    return winningCombos.some(combo => {
        return combo.every(index => board[index] === currentPlayer)
    })
}

function updateBoard(evnt) {
    const index = Number(evnt.target.id)

    if (winner || tie) return
    if (board[index] !== ' ') return

    const currentPlayer = turn % 2 !== 0 ? 'X' : 'O'
    board[index] = currentPlayer
    turn++
    render()

    if (checkWinner(currentPlayer)) {
        winner = true
        messageEl.textContent = `Winner ${currentPlayer}`
        return
    }

    if (board.every(cell => cell !== ' ')) {
        tie = true
        messageEl.textContent = 'Tie Game!'
        return
    }

    const nextPlayer = turn % 2 !== 0 ? 'X' : 'O'
    messageEl.textContent = `Player ${nextPlayer}'s turn`
}

function render() {
    for (let index = 0; index < squareEls.length; index++) {
        squareEls[index].textContent = board[index]
    }
}

function resetGame() {
    init()
}

/*----------------------------- Event Listeners -----------------------------*/
window.addEventListener("load", init)

for (let index = 0; index < squareEls.length; index++) {
    squareEls[index].addEventListener('click', updateBoard)
}

resetBtn.addEventListener('click', resetGame)