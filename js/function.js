const cells = document.querySelectorAll('.tic-tac-toe-cell');
const restartButton = document.getElementById('restart-button');
const winner = document.getElementById("winner");
let currentTurn = 'first';
let tableArray = [null, null, null, null, null, null, null, null, null];
const victoryList = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

// 先行・後攻 交代
const changeTurn = currentTurn => {
  if (currentTurn === 'first') {
    return 'second';
  }
  if (currentTurn === 'second') {
    return 'first';
  }
}

// 現在のプレイヤー表示
const showCurrentPlayer = currentTurn => {
  if (currentTurn === 'first') {
    document.getElementById("player-first").classList.add("is-active");
    document.getElementById("player-second").classList.remove("is-active");
  }
  if (currentTurn === 'second') {
    document.getElementById("player-first").classList.remove("is-active");
    document.getElementById("player-second").classList.add("is-active");
  }
}

// 配列にチェックを入れる
const addMarker = (currentTurn, target) => {
  const marker = currentTurn;
  const targetNumber = target.dataset.cell;
  tableArray[targetNumber - 1] = marker;
}

// マスにマークを表示する
const showMarker = (tableArray, targets) => {
  targets.forEach((target, index) => {
    if (tableArray[index] === 'first') {
      target.innerHTML = '○';
    } else if (tableArray[index] === 'second') {
      target.innerHTML = '✗';
    }
  })
}

// 勝敗チェック
const victoryOrDefeatCheck = (victoryList, tableArray) => {
  let victoryPlayer = null;
  victoryList.forEach(victoryListItem => {
    const marker1 = tableArray[victoryListItem[0] - 1];
    const marker2 = tableArray[victoryListItem[1] - 1];
    const marker3 = tableArray[victoryListItem[2] - 1];
    if (marker1 === marker2 && marker2 === marker3 && marker1 !== null) {
      victoryPlayer = marker1;
    }
  });
  return victoryPlayer;
}

// ゲーム終了判定
const finishGame = victoryPlayer => {
  if (victoryPlayer === null) {
    winner.innerHTML = "starting...";
  } else {
    winner.innerHTML = `${victoryPlayer} win!!`;
    cells.forEach(cell => {
      cell.disabled = true;
    })
  }
}

// リスタート
const restartGame = () => {
  cells.forEach(cell => {
    cell.disabled = false;
    cell.innerHTML = '';
    currentTurn = 'first';
    tableArray = [null, null, null, null, null, null, null, null, null];
  })
}


// マスをクリックしたとき

cells.forEach(cell => {
  cell.addEventListener('click', event => {
    const target = event.target;
    if (target.disabled === true) {
      return
    }

    addMarker(currentTurn, target);
    showMarker(tableArray, cells);

    finishGame(victoryOrDefeatCheck(victoryList, tableArray));

    currentTurn = changeTurn(currentTurn);
    showCurrentPlayer(currentTurn);
    target.disabled = true;
  });
});

restartButton.addEventListener('click', () => {
  restartGame();
  showCurrentPlayer(currentTurn);
  finishGame(victoryOrDefeatCheck(victoryList, tableArray));
} );