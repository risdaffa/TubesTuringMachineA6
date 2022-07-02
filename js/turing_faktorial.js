let num1 = document.getElementById("num1");     // Number 1

// tampilkan tape
function execute() {
    // jika kondisi terpenuhi
    if (num1.value && parseInt(num1.value) > 0) {
        // Clear
        executeClear();

        // Enable speed option
        enableSpeed();

        // Enable button play, nextmove, clear
        enableButton(0);
        enableButton(2);
        enableButton(3);

        // Disable button pause
        disableButton(1);

        // Menambah blank symbol di awal
        tapeCells.push(new Cell("B"));
        tapeCells.push(new Cell("B"));
        tmTape.childNodes[1].className += " active";
        it = 2; // Awal head
        state = 0; // Awal state
        
        // Memasukkan 0 sejumlah num1
        for (i = 0; i < num1.value; i++) {
            tapeCells.push(new Cell("0"));
        }
        tapeCells.push(new Cell("B"));
        tapeCells.push(new Cell("B"));
    }
}

// Function to compute factorial
function factorial(n){
    let answer = 1;
    if (n == 0 || n == 1){
      return answer;
    }else{
      for(var i = n; i >= 1; i--){
        answer = answer * i;
      }
      return answer;
    }  
  }

// Show answer
function showAns() {
    // Log
    let ans = factorial(num1.value);
    
    // Menampilkan jawaban
    let ansField = document.getElementById("ans");
    ansField.textContent = ans;
}

// next move button
function executeNextMove() {
    // Log
    // if exist
    if (tapeCells[0]) {
        // Deactivate 
        curCell = document.getElementsByClassName("active");
        for (i = 0; i < curCell.length; i++) {
            curCell[i].className = curCell[i].className.replace(" active", "");
        }

        // STATE 0
        if (state == 0) {
            // 0/0,R to state 0
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 0);
            }
            // B/1,S to state 1
            else if (tapeCells[it].symbol == "B") {
                move("1", 0, 1, 1);
            }
        }

        // STATE 1
        else if (state == 1) {
            // 0/0,L to state 1
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 1);
            }
            // 1/1,L to state 1
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 1);
            }
            // B/B,R to state 2
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 2);
            }
        }

        // STATE 2
        else if (state == 2) {
            // 0/X,R to state 3
            if (tapeCells[it].symbol == "0") {
                move("X", 1, 3);
            }
            // 1/1,R to state 5
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 5);
            }
        }

        // STATE 3
        else if (state == 3) {
            // 0/0,R to state 3
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 3);
            }
            // 1/1,R to state 3
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 3);
            }
            // B/0,S to state 4
            else if (tapeCells[it].symbol == "B") {
                move("0", 0, 4, 1);
            }
        }

        // STATE 4
        else if (state == 4) {
            // 0/0,L to state 4
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 4);
            }
            // 1/1,L to state 4
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 4);
            }
            // X/X,R to state 2
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 2);
            }   
        }

        // STATE 5
        else if (state == 5) {
            // 0/0,R to state 5
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 5);
            }
            // B/1,L to state 6
            else if (tapeCells[it].symbol == "B") {
                move("1", -1, 6, 1);
            }
        }

        // STATE 6
        else if (state == 6) {
            // 0/0,L to state 6
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 6);
            }
            // 1/1,L to state 6
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 6);
            }
            // X/0,L to state 6
            else if (tapeCells[it].symbol == "X") {
                move("0", -1, 6);
            }
            // B/B,R to state 7
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 7);
            }
        }

        // STATE 7
        else if (state == 7) {
            // 0/B,R to state 8
            if (tapeCells[it].symbol == "0") {
                move("B", 1, 8);
            }
        }

        // STATE 8
        else if (state == 8) {
            // 0/X,R to state 9
            if (tapeCells[it].symbol == "0") {
                move("X", 1, 9);
            }
            // 1/1,L to state 15
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 15);
            }
        }

        // STATE 9
        else if (state == 9) {
            // 0/0,R to state 9
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 9);
            }
            // 1/1,R to state 10
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 10);
            }
        }

        // STATE 10
        else if (state == 10) {
            // 0/X,R to state 11
            if (tapeCells[it].symbol == "0") {
                move("X", 1, 11);
            }
            // 1/1,L to state 13
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 13);
            }
        }

        // STATE 11
        else if (state == 11) {
            // 0/0,R to state 11
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 11);
            }
            // 1/1,R to state 11
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 11);
            }
            // B/0,S to state 12
            else if (tapeCells[it].symbol == "B") {
                move("0", 0, 12, 1);
            }
        }

        // STATE 12
        else if (state == 12) {
            // 0/0,L to state 12
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 12);
            }
            // 1/1,L to state 12
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 12);
            }
            // X/X,R to state 10
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 10);
            }
        }

        // STATE 13
        else if (state == 13) {
            // X/0,L to state 13
            if (tapeCells[it].symbol == "X") {
                move("0", -1, 13);
            }
            // 1/1,L to state 14
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 14);
            }
        }

        // STATE 14
        else if (state == 14) {
            // 0/0,L to state 14
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 14);
            }
            // 1/0,L to state 14
            else if (tapeCells[it].symbol == "1") {
                move("0", -1, 14);
            }
            // X/X,R to state 8
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 8);
            }
        }

        // STATE 15
        else if (state == 15) {
            // 0/0,L to state 15
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 15);
            }
            // 1/1,L to state 15
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 15);
            }
            // X/X,L to state 15
            else if (tapeCells[it].symbol == "X") {
                move("X", -1, 15);
            }
            // B/B,R to state 16
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 16);
            }
        }

        // STATE 16
        else if (state == 16) {
            // 1/B,R to state 24
            if (tapeCells[it].symbol == "1") {
                move("B", 1, 24);
            }
            // X/B,R to state 17
            else if (tapeCells[it].symbol == "X") {
                move("B", 1, 17);
            }
        }

        // STATE 17
        else if (state == 17) {
            // 0/B,R to state 21
            if (tapeCells[it].symbol == "0") {
                move("B", 1, 21);
            }
            // 1/B,R to state 21
            else if (tapeCells[it].symbol == "1") {
                move("B", 1, 21);
            }
            // X/X,R to state 18
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 18);
            }
        }

        // STATE 18
        else if (state == 18) {
            // 0/0,R to state 18
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 18);
            }
            // X/X,R to state 18
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 18);
            }
            // 1/1,R to state 19
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 19);
            }
        }

        // STATE 19
        else if (state == 19) {
            // 0/0,R to state 19
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 19);
            }
            // X/X,R to state 19
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 19);
            }
            // 1/1,L to state 20
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 20);
            }
        }

        // STATE 20
        else if (state == 20) {
            // X/X,L to state 20
            if (tapeCells[it].symbol == "X") {
                move("X", -1, 20);
            }
            // 0/X,L to state 15
            else if (tapeCells[it].symbol == "0") {
                move("X", -1, 15);
            }
            // 1/X,L to state 15
            else if (tapeCells[it].symbol == "1") {
                move("X", -1, 15);
            }
        }

        // STATE 21
        else if (state == 21) {
            // 0/B,R to state 21
            if (tapeCells[it].symbol == "0") {
                move("B", 1, 21);
            }
            // X/X,R to state 22
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 22);
            }
            // 1/B,S to state 25
            else if (tapeCells[it].symbol == "1") {
                move("B", 0, 25);
            }
        }

        // STATE 22
        else if (state == 22) {
            // 0/0,R to state 22
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 22);
            }
            // 1/1,R to state 22
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 22);
            }
            // X/X,R to state 22
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 22);
            }
            // B/1,L to state 23
            else if (tapeCells[it].symbol == "B") {
                move("1", -1, 23, 1);
            }
        }

        // STATE 23
        else if (state == 23) {
            // 0/0,L to state 23
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 23);
            }
            // 1/1,L to state 23
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 23);
            }
            // X/0,R to state 23
            else if (tapeCells[it].symbol == "X") {
                move("0", 1, 23);
            }
            // B/B,R to state 8
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 8);
            }
        }

        // STATE 24
        else if (state == 24) {
            // 0/0,R to state 24
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 24);
            }
            // 1/B,R to state 24
            else if (tapeCells[it].symbol == "1") {
                move("B", 1, 24);
            }
            // B/B,S to state 25
            else if (tapeCells[it].symbol == "B") {
                move("B", 0, 25);
            }
        }

        // STATE 25 (FINAL STATE)
        else if (state == 25) {
            reachedEndState();
        }
    }
}