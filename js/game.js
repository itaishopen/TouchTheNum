//  var gCurrentNum;
var gBoard;
var gTimerInterval;
var gRecordBoard = new Map();
var gPlayerName = null;

function initGame() {
  var elGame = document.querySelector('.game');
  elGame.classList.remove('blur');
  if (gPlayerName === null) {
    gPlayerName = prompt('Please enter your name');
  }
  var size = +prompt('Please select the numbers of rows');
  gBoard = createBoard(size);
  gCurrentNum = 1;
  document.querySelector('.current-num span').innerText = gCurrentNum;
  var elEndGame = document.querySelector('.endGame');
  elEndGame.innerHTML = '';
  elEndGame.style.visibility = 'hidden'
  renderBoard();
}

function resetGame() {
  var elEndGame = document.querySelector('.endGame');
  elEndGame.innerHTML = `<h3>is it stil ${gPlayerName} playing?</h3>
  <button class = "btn" onclick = "initGame()">yes</button> <button class = "btn" onclick = "gPlayerName = null, initGame()">no</button>`;
}

function createBoard(size) {
  var numsPool = createNums(size);
  var newBoard = [];
  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++) {
      var num = Math.floor(Math.random() * numsPool.length);
      row.push(numsPool.splice(num, 1).join());
    }
    newBoard.push(row);
  }
  return newBoard;
}

function renderBoard() {
  var strHtml = '';
  for (var i = 0; i < gBoard.length; i++) {
    strHtml += `<tr>`;
    for (var j = 0; j < gBoard[0].length; j++) {
      var item = gBoard[i][j];
      strHtml += `<td class = "cell${item}" onclick = "cellClicked(${item})">${item}</td>`;
    }
    strHtml += `</tr>`;
  }
  var elTable = document.querySelector('table');
  elTable.innerHTML = strHtml;
}

function cellClicked(elCell) {
  if (gCurrentNum === +elCell) {
    var el = document.querySelector(`.cell${elCell}`);
    el.className += ' clicked';
    if (gCurrentNum === 1 && gBoard.length > 1) {
      timer();
    }
    if (gCurrentNum < gBoard.length ** 2) {
      gCurrentNum += 1;
      var elNum = document.querySelector('.current-num span');
      elNum.innerText = gCurrentNum;
    } else {
      clearInterval(gTimerInterval);
      var eltime = 0.01;
      if (gBoard.length > 1) {
        var eltime = document.querySelector('.timer span').innerText;
      }
      var record = gRecordBoard.get(gBoard.length);
      if (record + '' === 'undefined' || record.score > eltime) {
        gRecordBoard.set(gBoard.length, { name: gPlayerName, score: eltime });
      }
      record = gRecordBoard.get(gBoard.length);
      var elGame = document.querySelector('.game');
      elGame.className += ' blur';
      var nextGame = `<h3> 
        your time was ${eltime} seconds<br /> 
        the best time for that board is ${record.score} seconds by ${
        record.name
      } <br />
        do you want to play again? </h3>
        <button class = "btn" onclick = "resetGame()">yes</button> <button class = "btn" onclick = "window.open('', '_self', ''); window.close();">no</button>`;
      var elEndGame = document.querySelector('.endGame');
      elEndGame.innerHTML = nextGame;
      elEndGame.style.visibility = '';
    }
  }
}

function createNums(size) {
  var nums = [];
  for (var i = 1; i <= size ** 2; i++) {
    nums.push(i);
  }
  return nums;
}

function timer() {
  var counter = 0;
  gTimerInterval = setInterval(function() {
    var elTimer = document.querySelector('.timer span');
    elTimer.innerText = counter / 100;
    counter += 1;
  }, 10);
}
