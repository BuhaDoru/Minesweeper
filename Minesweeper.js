let grid = document.getElementById("grid");
generateGrid();
let timer;
let ele = document.getElementById("timer");

(function time() {
      let sec = 1;
      timer = setInterval(()=>{
            ele.innerHTML = "Timer: " + sec + " seconds";
            ++sec;
      }, 1000)
})()

function stopTimer() {
      clearInterval(timer);
}

function generateGrid() {
      grid.innerHTML = "";
      for (let i = 0; i < 10; ++i) {
            row = grid.insertRow(i);
            for (let j = 0; j < 10; ++j) {
                  cell = row.insertCell(j);
                  cell.onclick = function() { clickCell(this); }; 
                  cell.onmousedown = function() { flagCell(this); };
                  let mine = document.createAttribute("data-mine");       
                  mine.value = "false";             
                  cell.setAttributeNode(mine);
            }
        }
        addMines();
}

function addMines() {
      for (let i = 0; i < 10; ++i) {
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);
            let cell = grid.rows[row].cells[col];
            cell.setAttribute("data-mine","true");
      }
}

function revealMines() {
      for (let i = 0; i < 10; ++i) {
            for(let j = 0; j < 10; ++j) {
                  let cell = grid.rows[i].cells[j];
                  if (cell.getAttribute("data-mine") == "true") cell.className = "mine";
            }
      }
}

function flagCell(cell) {
       if (cell.className != "clicked") {
             cell.className = "flag"
        }
}
      
function clickCell(cell) {
      if (cell.getAttribute("data-mine") == "true") {
            revealMines();
            alert("Game Over");
             stopTimer();
      } else {
            cell.className = "clicked";
            let mineCount = 0;
            let cellRow = cell.parentNode.rowIndex;
            let cellCol = cell.cellIndex;
            for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); ++i) {
                  for(let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); ++j) {
                        if (grid.rows[i].cells[j].getAttribute("data-mine") == "true") ++mineCount;
                  }
            }
            cell.innerHTML = mineCount;
            if (mineCount == 0) { 
                  for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); ++i) {
                        for(let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); ++j) {
                              if (grid.rows[i].cells[j].innerHTML == "") {
                                    clickCell(grid.rows[i].cells[j]);
                              }
                        }
                  }
            }
            checkCompletion();
      }
}

function checkCompletion() {
      let levelComplete = true;
      for (let i = 0; i < 10; ++i) {
            for(let j = 0; j < 10; ++j) {
                  if ((grid.rows[i].cells[j].getAttribute("data-mine") == "false") && (grid.rows[i].cells[j].innerHTML == "")) levelComplete = false;
            }
      }
      if (levelComplete) {
            alert("You Win!");
            revealMines();
            stopTimer();
      }
}

document.querySelector("table").addEventListener("contextmenu", (e) => {
      e.preventDefault();
})

function restartGame() {
      location.reload();
}
