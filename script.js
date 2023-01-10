const size = 3;
const rows = [];
let turn = 'X';
const gameBoard = document.getElementById('game-board');


// restart function
const restartGame = () => {
  turn = 'X';
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      rows[i].cells[j].textContent = '';
      rows[i].cells[j].addEventListener('click', cellClickHandler);
    }
  }
  const button = gameBoard.querySelector('button');
  if (button) {
    button.parentElement.removeChild(button);
  }
}

// when game ends, this function will be executed
const endGame = (winner) => {
  const message = document.createElement('div');
  message.textContent = `Game Over! Player ${winner} won!`;
  message.style.cssText = `
  position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 350px auto 0;
    width: 30%;
    height: 5%;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
  `;
  gameBoard.appendChild(message);
  for (let i = 0; i < size ** 2; i++) {
    rows[i / size | 0].cells[i % size].removeEventListener('click', cellClickHandler);
  }
  const button = document.createElement('button');
  button.textContent = 'Restart';
  button.addEventListener('click', () => {
    message.parentElement.removeChild(message);
    restartGame();
  });
  const existingButton = gameBoard.querySelector('button');
  if (existingButton) {
    existingButton.parentElement.removeChild(existingButton);
  }
  gameBoard.appendChild(button);
}



const checkForWin = () => {
  // check rows
  for (let i = 0; i < size; i++) {
    if (rows[i].cells[0].textContent === turn && rows[i].cells[1].textContent === turn && rows[i].cells[2].textContent === turn) {
      endGame(turn);
      return;
    }
  }
  // check columns
  for (let i = 0; i < size; i++) {
    if (rows[0].cells[i].textContent === turn && rows[1].cells[i].textContent === turn && rows[2].cells[i].textContent === turn) {
      endGame(turn);
      return;
    }
  }
  // check diagonals
  if (rows[0].cells[0].textContent === turn && rows[1].cells[1].textContent === turn && rows[2].cells[2].textContent === turn) {
    endGame(turn);
    return;
  }
  if (rows[0].cells[2].textContent === turn && rows[1].cells[1].textContent === turn && rows[2].cells[0].textContent === turn) {
    endGame(turn);
    return;
  }
  // check for draw
  let draw = true;
  for (let i = 0; i < size ** 2; i++) {
    if (rows[i / size | 0].cells[i % size].textContent === '') {
      draw = false;
      break;
    }
  }
  if (draw) {
    endGame('nobody');
  }
}

const cellClickHandler = (e) => {
  if (e.target.textContent !== '') {
    return;
  }
  e.target.textContent = turn;
  checkForWin();
  turn = (turn === 'X') ? 'O' : 'X';
}

const init = () => {
  const gameBoard = document.getElementById('game-board');
  for (let i = 0; i < size; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    gameBoard.appendChild(row);
    rows.push({
      element: row,
      cells: []
    });
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      row.appendChild(cell);
      rows[i].cells.push(cell);
      cell.addEventListener('click', cellClickHandler);
    }
  }
}

init();
