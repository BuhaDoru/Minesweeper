      var grid = document.getElementById("grid");
      generateGrid();

      var timer;
      var ele = document.getElementById("timer");

      (function time() {
        var sec = 0;
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
        for (var i = 0; i < 10; ++i) {
          row = grid.insertRow(i);
          for (var j = 0; j < 10; ++j) {
            cell = row.insertCell(j);
            cell.onclick = function() { clickCell(this); };
            var mine = document.createAttribute("data-mine");       
            mine.value = "false";             
            cell.setAttributeNode(mine);
          }
        }
        addMines();
      }

      function addMines() {
        for (var i = 0; i < 10; ++i) {
          var row = Math.floor(Math.random() * 10);
          var col = Math.floor(Math.random() * 10);
          var cell = grid.rows[row].cells[col];
          cell.setAttribute("data-mine","true");
        }
      }

      function revealMines() {
        for (var i = 0; i < 10; ++i) {
          for(var j = 0; j < 10; ++j) {
            var cell = grid.rows[i].cells[j];
            if (cell.getAttribute("data-mine") == "true") cell.className = "mine";
          }
        }
      }

      function right(event) {
        if (event.button == 2) {
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
          var mineCount = 0;
          var cellRow = cell.parentNode.rowIndex;
          var cellCol = cell.cellIndex;
          for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); ++i) {
            for(var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); ++j) {
              if (grid.rows[i].cells[j].getAttribute("data-mine") == "true") ++mineCount;
            }
          }
          cell.innerHTML = mineCount;
          if (mineCount == 0) { 
            for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); ++i) {
              for(var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); ++j) {
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
        var levelComplete = true;
        for (var i = 0; i < 10; ++i) {
          for(var j = 0; j < 10; ++j) {
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
