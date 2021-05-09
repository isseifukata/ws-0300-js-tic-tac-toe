let currentTurn = 'first';
let tableArray = [null,null,null,null,null,null,null,null,null];
const victoryList = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]
];

// 先行・後攻 交代
const changeTurn = currentTurn => {
  if(currentTurn === 'first'){
    return 'second';
  }
  if(currentTurn === 'second'){
    return 'first';
  }
}

// 配列にチェックを入れる
const addMarker = (currentTurn, target) => {
  let marker = currentTurn;
  const targetNumber = target.dataset.cell;
  tableArray[targetNumber - 1] = marker;
}

// マスにマークを表示する
const showMarker = (tableArray, targets) => {
  targets.forEach( (target, index) => {
    if(tableArray[index] === 'first'){
      target.innerHTML = '○';
    } else if(tableArray[index] === 'second'){
      target.innerHTML = '✗';
    }
  })
}

// 勝敗チェック


// マスをクリックしたとき
const cells = document.querySelectorAll('.tic-tac-toe-cell');

cells.forEach( cell => {
  cell.addEventListener('click', event => {
    const target = event.target;
    if(target.disabled === true){
      return
    }

    addMarker(currentTurn, target);
    showMarker(tableArray, cells);

    currentTurn = changeTurn(currentTurn);
    target.disabled = true;
  });
});
