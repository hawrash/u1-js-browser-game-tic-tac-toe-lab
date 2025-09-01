const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [1, 4, 7],
  [0, 3, 6],
  [2, 5, 8],
];
/*---------------------------- Variables (state) ----------------------------*/

let board = [
    '', '', '', 
    '', '', '', 
    '', '', '',
];
let turn = 'X';
let winner = false;
let tie = false;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector(`#message`);
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/

const render = () => {
  updateBoard();
  updateMessage();
};



const updateBoard = () => {
  board.forEach((value, index) => {
    squareEls[index].textContent = value;
  });
};

const updateMessage = () => {
  if (winner === false && tie === false) {
    messageEl.textContent = `It's ${turn}'s turn.`;
  } else if (winner === false && tie === true) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `Congratulations! ${turn} wins!`;
  }
};

const init = () => {
  board = [
    '', '', '',
    '', '', '',
    '', '', ''
  ];
  turn = 'O';
  winner = false;
  tie = false;
  render();
};

const handleClick = (event) => {
  const squareIndex = parseInt(event.target.id);

  if (board[squareIndex] === 'X' || board[squareIndex] === 'O') {
    return;
  }

  if (winner === true) {
    return;
  };
  placePiece (squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();

};

const placePiece = (index) => {
  board[index] = turn;        
};

const checkForWinner = () => {
  winningCombos.forEach((combo) => {
    const [a, b, c] = combo;  

    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
    }
      });
};

const checkForTie = () => {
  if (winner === true) return;

  if (board.includes('')) {
    tie = false;
  } else {
    tie = true;
  }

};
const switchPlayerTurn = () => {
  if (winner === true) return;

  if (turn === 'X') {
    turn = 'O';
  } else {
    turn = 'X';
  }

};



init ()
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
  square.addEventListener('click', handleClick);
});
resetBtnEl.addEventListener('click', init);
