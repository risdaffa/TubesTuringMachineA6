let num1 = document.getElementById("num1");     // Number 1
let num2 = document.getElementById("num2");     // Number 2

// tampilkan tape
function execute() {
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

    // Memasukkan 0 atau 1 sejumlah num1
    if (num1.value < 0) {
        for (i = 0; i > num1.value; i--) {
            tapeCells.push(new Cell("1"));  // 1 sebagai negatif
        }
    }
    else if (num1.value > 0) {
        for (i = 0; i < num1.value; i++) {
            tapeCells.push(new Cell("0"));  // 0 sebagai positif
        }
    }

    // Pembatas
    tapeCells.push(new Cell("X"));

    // Memasukkan 0 atau 1 sejumlah num2
    if (num2.value < 0) {
        for (i = 0; i > num2.value; i--) {
            tapeCells.push(new Cell("1"));  // 1 sebagai negatif
        }
    }
    else if (num2.value > 0) {
        for (i = 0; i < num2.value; i++) {
            tapeCells.push(new Cell("0"));  // 0 sebagai positif
        }
    }

    // Blank symbol di akhir tape
    tapeCells.push(new Cell("B"));
    tapeCells.push(new Cell("B"));
}

// Show answer
function showAns() {
    // Penjumlahan
    let ans = +num1.value - +num2.value;

    // Menampilkan jawaban
    let ansField = document.getElementById("ans");
    ansField.textContent = ans;
}

// next move button
function executeNextMove() {
    // Penjumlahan
    // if exist
    if (tapeCells[0]) {
        // Deactivate 
        curCell = document.getElementsByClassName("active");
        for (i = 0; i < curCell.length; i++) {
            curCell[i].className = curCell[i].className.replace(" active", "");
        }

        // STATE 0
        if (state == 0) {
            // 0 / 0, R to state 1
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 1);
            }
            // 1 / 1, R to state 11
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 11);
            }
        }

        // STATE 1
        else if (state == 1) {
            // 0 / 0, R to state 1
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 1);
            }
            // X / X, R to state 2
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 2);
            }
        }

        // STATE 2
        else if (state == 2) {
            // 1 / 1, R to state 3
            if (tapeCells[it].symbol == "1") {
                move("1", 1, 3);
            }
            // 0 / Y, L to state 6
            else if (tapeCells[it].symbol == "0") {
                move("Y", -1, 6);
            }
        }

        // STATE 3
        else if (state == 3) {
            // 1 / 1, R to state 3
            if (tapeCells[it].symbol == "1") {
                move("1", 1, 3);
            }
            // B / B, L to state 4
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 4);
            }
        }

        // STATE 4
        else if (state == 4) {
            // 1 / B, L to state 5
            if (tapeCells[it].symbol == "1") {
                move("B", -1, 5);
            }
        }

        // STATE 5
        else if (state == 5) {
            // 1 / 0, L to state 5
            if (tapeCells[it].symbol == "1") {
                move("0", -1, 5);
            }
            // X / 0, L to state 10
            else if (tapeCells[it].symbol == "X") {
                move("0", -1, 10);
            }
        }

        // STATE 6
        else if (state == 6) {
            // X / X, L to state 6
            if (tapeCells[it].symbol == "X") {
                move("X", -1, 6);
            }
            // Y / Y, L to state 6
            else if (tapeCells[it].symbol == "Y") {
                move("Y", -1, 6);
            }
            // 0 / Y, R to state 7
            else if (tapeCells[it].symbol == "0") {
                move("Y", 1, 7);
            }
            // B / B, R to state 9
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 9);
            }
        }

        // STATE 7
        else if (state == 7) {
            // X / X, R to state 7
            if (tapeCells[it].symbol == "X") {
                move("X", 1, 7);
            }
            // Y / Y, R to state 7
            else if (tapeCells[it].symbol == "Y") {
                move("Y", 1, 7);
            }
            // B / B, L to state 8
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 8);
            }
            // 0 / Y, L to state 6
            else if (tapeCells[it].symbol == "0") {
                move("Y", -1, 6);
            }
        }

        // STATE 8
        else if (state == 8) {
            // X / B, L to state 8
            if (tapeCells[it].symbol == "X") {
                move("B", -1, 8);
            }
            // Y / B, L to state 8
            else if (tapeCells[it].symbol == "Y") {
                move("B", -1, 8);
            }
            // 0 / 0, R to state 10
            else if (tapeCells[it].symbol == "0") {
                move("0", 1, 10);
            }
            // B / B, R to state 10
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 10);
            }
        }

        // STATE 9
        else if (state == 9) {
            // X / B, R to state 9
            if (tapeCells[it].symbol == "X") {
                move("B", 1, 9);
            }
            // Y / B, R to state 9
            else if (tapeCells[it].symbol == "Y") {
                move("B", 1, 9);
            }
            // 0 / 1, R to state 9
            else if (tapeCells[it].symbol == "0") {
                move("1", 1, 9);
            }
            // B / 1, R to state 10
            else if (tapeCells[it].symbol == "B") {
                move("1", 1, 10, 1);
            }
        }

        // STATE 10 (FINAL STATE)
        else if (state == 10) {
            reachedEndState();
        }
        
        // STATE 11
        else if (state == 11) {
            // 1 / 1, R to state 11
            if (tapeCells[it].symbol == "1") {
                move("1", 1, 11);
            }
            // X / X, R to state 12
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 12);
            }
        }

        // STATE 12
        else if (state == 12) {
            // 0 / 0, R to state 13
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 13);
            }
            // 1 / Y, L to state 16
            else if (tapeCells[it].symbol == "1") {
                move("Y", -1, 16);
            }
        }

        // STATE 13
        else if (state == 13) {
            // 0 / 0, R to state 13
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 13);
            }
            // B / B, L to state 14
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 14);
            }
        }

        // STATE 14
        else if (state == 14) {
            // 0 / B, L to state 15
            if (tapeCells[it].symbol == "0") {
                move("B", -1, 15);
            }
        }

        // STATE 15
        else if (state == 15) {
            // 0 / 1, L to state 15
            if (tapeCells[it].symbol == "0") {
                move("1", -1, 15);
            }
            // X / 1, L to state 10
            else if (tapeCells[it].symbol == "X") {
                move("1", -1, 10);
            }
        }

        // STATE 16
        else if (state == 16) {
            // X / X, L to state 16
            if (tapeCells[it].symbol == "X") {
                move("X", -1, 16);
            }
            // Y / Y, L to state 16
            else if (tapeCells[it].symbol == "Y") {
                move("Y", -1, 16);
            }
            // 1 / Y, R to state 17
            else if (tapeCells[it].symbol == "1") {
                move("Y", 1, 17);
            }
            // B / B, R to state 19
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 19);
            }
        }

        // STATE 17
        else if (state == 17) {
            // X / X, R to state 17
            if (tapeCells[it].symbol == "X") {
                move("X", 1, 17);
            }
            // Y / Y, R to state 17
            else if (tapeCells[it].symbol == "Y") {
                move("Y", 1, 17);
            }
            // B / B, L to state 18
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 18);
            }
            // 1 / Y, L to state 16
            else if (tapeCells[it].symbol == "1") {
                move("Y", -1, 16);
            }
        }

        // STATE 18
        else if (state == 18) {
            // X / B, L to state 18
            if (tapeCells[it].symbol == "X") {
                move("B", -1, 18);
            }
            // Y / B, L to state 18
            else if (tapeCells[it].symbol == "Y") {
                move("B", -1, 18);
            }
            // 1 / 1, R to state 10
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 10);
            }
            // B / B, R to state 10
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 10);
            }
        }

        // STATE 19
        else if (state == 19) {
            // X / B, R to state 19
            if (tapeCells[it].symbol == "X") {
                move("B", 1, 19);
            }
            // Y / B, R to state 19
            else if (tapeCells[it].symbol == "Y") {
                move("B", 1, 19);
            }
            // 1 / 0, R to state 19
            else if (tapeCells[it].symbol == "1") {
                move("0", 1, 19);
            }
            // B / 0, R to state 10
            else if (tapeCells[it].symbol == "B") {
                move("0", 1, 10, 1);
            }
        }
    }
}
