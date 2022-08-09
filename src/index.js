import './style.css';

const gameBoard = (() => {

  let board = [];
  let XO = "X";
  let gameOver = false;

  const msg = document.createElement('div');
  msg.classList.add('msg');
  document.body.appendChild(msg);

  const restart = document.createElement('button');
  restart.innerHTML = "Restart";
  document.body.appendChild(restart);
  restart.addEventListener('click',restartBoard);

  const container = document.createElement('div');  
  container.classList.add('container');

  function restartBoard() {
    board.forEach(div => {
      div.innerHTML = "";
      div.classList.remove("win");
    });
    XO = "X";
    gameOver = false;
    msg.innerHTML = `${XO}'s turn...`;
  }

  restartBoard();
  
  function squareClicked(i) {
    
    if(gameOver) return;

    const square = board[i];

    if(!square.innerHTML)
    {
      square.innerHTML += XO;      
      checkGameOver(i);
      
      
    }
  }

  function checkGameOver(i) {

    let mymsg = "Game Over.";

    // check if any winner rows containing i
    gameOver = winnerRow(i) || winnerCol(i) || winnerDiag(i);
    if(gameOver) mymsg = `${XO} wins!`;

    // finally check if all cells populated    
    gameOver = gameOver || (board.reduce((a,b) => a+b.innerHTML,"").length == 9)
    
    XO = (XO=="X" ? "O" : "X");    

    msg.innerHTML = (gameOver ? `${mymsg} Please restart` : `${XO}'s turn...`);
    
  }
  
  function winnerRow(i) {
    const rowNum = Math.floor(i/3);
    let row = "";

    // check all on the same row if they are also XO'd
    for(let cell=rowNum*3;cell<rowNum*3+3;cell++) 
      row += board[cell].innerHTML;
    
    const win = ["XXX","OOO"].includes(row);

    if(win) {
      //decorate those divs:
      for(let cell=rowNum*3;cell<rowNum*3+3;cell++) 
        board[cell].classList.add('win');
    }

    return win;

  }

  function winnerCol(i) {
    const colNum = i % 3;
    let col = "";

    // check all on the same col if they are also XO'd
    for(let cell=colNum;cell<colNum+7;cell=cell+3) 
      col += board[cell].innerHTML;
    
    const win = ["XXX","OOO"].includes(col);

    if(win) {
      //decorate those divs:
      for(let cell=colNum;cell<colNum+7;cell=cell+3) 
        board[cell].classList.add('win');
    }

    return win;

  }

  function winnerDiag(i) {
    
    if(i%2) return false;

    // just check both diags
    const diags = [[0,4,8],[2,4,6]];
    let win = false;

    diags.forEach(diag => {
    
      let d = "";
      diag.forEach(cell=> d+=board[cell].innerHTML);
      
      if(["XXX","OOO"].includes(d)) diag.forEach(cell => board[cell].classList.add("win"));

      win = win || ["XXX","OOO"].includes(d);
    });

    return win;
  }

  // build the squares
  for (let i=0;i<9;i++)
  {
    let square = document.createElement('div');
    board.push(square);
    square.addEventListener('click',() => squareClicked(i));
    container.appendChild(square);    
  }

  document.body.appendChild(container);

})();



