let num1 = document.getElementById("num1");     // Number 1

// tampilkan tape
function execute() {
    // jika kondisi terpenuhi
    if (num1.value && parseInt(num1.value) >= 0) {
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
        tapeCells.push(new Cell("B"));
        tapeCells.push(new Cell("B"));
        tapeCells.push(new Cell("B"));
        tmTape.childNodes[4].className += " active";
        it = 5; // Awal head
        state = 14; // Awal state

        // num1 convert ke binary
        let num = parseInt(num1.value);
        let binary = (num % 2).toString();
        for (; num > 1;) {
            num = parseInt(num / 2);
            binary = (num % 2) + (binary);
        }
        let binaryNum1 = binary;
        for (i = 0; i < binaryNum1.length; i++) {
            tapeCells.push(new Cell(binaryNum1[i]));
        }

        // Pembatas
        tapeCells.push(new Cell("*"));

        // Memasukkan binary dari untuk dikali 2 (binary dikali 2 brarti menambah 0 dibelakang)
        tapeCells.push(new Cell("0"));

        // Pembatas
        tapeCells.push(new Cell("+"));

        // Memasukkan binary dari 32
        tapeCells.push(new Cell("1"));
        tapeCells.push(new Cell("0"));
        tapeCells.push(new Cell("0"));
        tapeCells.push(new Cell("0"));
        tapeCells.push(new Cell("0"));
        tapeCells.push(new Cell("0"));

        // Blank symbol di akhir tape
        tapeCells.push(new Cell("B"));
        tapeCells.push(new Cell("B"));
        tapeCells.push(new Cell("B"));
    }
}

// Show answer
function showAns() {
    let ans = parseInt(num1.value) * 2 + 32;

    // Menampilkan jawaban
    let ansField = document.getElementById("ans");
    ansField.textContent = ans + "\u00B0F";
}

// next move button
function executeNextMove() {
    // Pembagian
    // if exist
    if (tapeCells[0]) {
        // Deactivate 
        curCell = document.getElementsByClassName("active");
        for (i = 0; i < curCell.length; i++) {
            curCell[i].className = curCell[i].className.replace(" active", "");
        }

        // STATE 14
        if (state == 14) {
            // 0 / 0, R to state 14
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 14);
            }
            // 1 / 1, R to state 14
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 14);
            }
            // * / *, R to state 15
            else if (tapeCells[it].symbol == "*") {
                move("*", 1, 15);
            }
        }

        // STATE 15
        else if (state == 15) {
            // 0 / +, L to state 16
            if (tapeCells[it].symbol == "0") {
                move("+", -1, 16);
            }
        }

        // STATE 16
        else if (state == 16) {
            // * / 0, R to state 0
            if (tapeCells[it].symbol == "*") {
                move("0", 1, 0);
            }
        }

        // STATE 0
        else if (state == 0) {
            // 0 / 0 , R to state 0
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 0);
            }
            // 1 / 1 , R to state 0
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 0);
            }
            // + / + , R to state 0
            else if (tapeCells[it].symbol == "+") {
                move("+", 1, 0);
            }
            // B / B , L to state 1
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 1);
            }
        }

        // STATE 1
        else if (state == 1) {
            // 1 / C , L to state 2
            if (tapeCells[it].symbol == "1") {
                move("C", -1, 2);
            }
            // 0 / C , L to state 6
            else if (tapeCells[it].symbol == "0") {
                move("C", -1, 6);
            }
            // + / B , L to state 9
            else if (tapeCells[it].symbol == "+") {
                move("B", -1, 9);
            }
        }

        // STATE 2
        else if (state == 2) {
            // 0 / 0 , L to state 2
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 2);
            }
            // 1 / 1 , L to state 2
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 2);
            }
            // + / + , L to state 3
            else if (tapeCells[it].symbol == "+") {
                move("+", -1, 3);
            }
        }

        // STATE 3
        else if (state == 3) {
            // X / X, L to state 3
            if (tapeCells[it].symbol == "X") {
                move("X", -1, 3);
            }
            // Y / Y, L to state 3
            else if (tapeCells[it].symbol == "Y") {
                move("Y", -1, 3);
            }
            // + / + , L to state 3
            else if (tapeCells[it].symbol == "+") {
                move("+", -1, 3);
            }
            // 0 / Y, R to state 4
            else if (tapeCells[it].symbol == "0") {
                move("Y", 1, 4);
            }
            // B / Y, R to state 4
            else if (tapeCells[it].symbol == "B") {
                move("Y", 1, 4);
            }
            // 1 / X, L to state 5
            else if (tapeCells[it].symbol == "1") {
                move("X", -1, 5);
            }
        }

        // STATE 4
        else if (state == 4) {
            // 0 / 0 , R to state 4
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 4);
            }
            // 1 / 1 , R to state 4
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 4);
            }
            // X / X , R to state 4
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 4);
            }
            // Y / Y , R to state 4
            else if (tapeCells[it].symbol == "Y") {
                move("Y", 1, 4);
            }
            // + / + , R to state 4
            else if (tapeCells[it].symbol == "+") {
                move("+", 1, 4);
            }
            // C / 1 , L to state 1
            else if (tapeCells[it].symbol == "C") {
                move("1", -1, 1);
            }
        }

        // STATE 5
        else if (state == 5) {
            // 1 / 0 , L to state 5
            if (tapeCells[it].symbol == "1") {
                move("0", -1, 5);
            }
            // 0 / 1 , R to state 4
            else if (tapeCells[it].symbol == "0") {
                move("1", 1, 4);
            }
            // B / 1 , R to state 4
            else if (tapeCells[it].symbol == "B") {
                move("1", 1, 4);
            }
        }

        // STATE 6
        else if (state == 6) {
            // 0 / 0 , L to state 6
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 6);
            }
            // 1 / 1 , L to state 6
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 6);
            }
            // + / + , L to state 7
            else if (tapeCells[it].symbol == "+") {
                move("+", -1, 7);
            }
        }

        // STATE 7
        else if (state == 7) {
            // X / X , L to state 7
            if (tapeCells[it].symbol == "X") {
                move("X", -1, 7);
            }
            // Y / Y , L to state 7
            else if (tapeCells[it].symbol == "Y") {
                move("Y", -1, 7);
            }
            // + / + , L to state 7
            else if (tapeCells[it].symbol == "+") {
                move("+", -1, 7);
            }
            // B / X , R to state 8
            else if (tapeCells[it].symbol == "B") {
                move("X", 1, 8);
            }
            // 1 / Y , R to state 8
            else if (tapeCells[it].symbol == "1") {
                move("Y", 1, 8);
            }
            // 0 / X , R to state 8
            else if (tapeCells[it].symbol == "0") {
                move("X", 1, 8);
            }
        }

        // STATE 8
        else if (state == 8) {
            // 0 / 0 , R to state 8
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 8);
            }
            // 1 / 1 , R to state 8
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 8);
            }
            // X / X , R to state 8
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 8);
            }
            // Y / Y , R to state 8
            else if (tapeCells[it].symbol == "Y") {
                move("Y", 1, 8);
            }
            // + / + , R to state 8
            else if (tapeCells[it].symbol == "+") {
                move("+", 1, 8);
            }
            // C / 0 , L to state 1
            else if (tapeCells[it].symbol == "C") {
                move("0", -1, 1);
            }
        }

        // STATE 9
        else if (state == 9) {
            // 0 / 0, L to state 9
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 9);
            }
            // 1 / 1, L to state 9
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 9);
            }
            // Y / 1, L to state 9
            else if (tapeCells[it].symbol == "Y") {
                move("1", -1, 9);
            }
            // X / 0, L to state 9
            else if (tapeCells[it].symbol == "X") {
                move("0", -1, 9);
            }
            // B / B, R to state 10
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 10);
            }
            // + / B , L to state 9
            else if (tapeCells[it].symbol == "+") {
                move("B", -1, 9);
            }
        }

        // STATE 10
        else if (state == 10) {
            // 0 / 0 , R to state 10
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 10);
            }
            // 1 / 1 , R to state 10
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 10);
            }
            // B / B , R to state 11
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 11);
            }
        }

        // STATE 11
        else if (state == 11) {
            // B / B , R to state 11
            if (tapeCells[it].symbol == "B") {
                move("B", 1, 12);
            }
        }
        
        // STATE 12
        else if (state == 12) {
            // 0 / B , R to state 12
            if (tapeCells[it].symbol == "0") {
                move("B", 1, 12);
            }
            // 1 / B , R to state 12
            else if (tapeCells[it].symbol == "1") {
                move("B", 1, 12);
            }
            // B / B , L to state 13
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 13);
            }
        }

        // STATE 13 (FINAL STATE)
        else if (state == 13) {
            reachedEndState();
        }
    }
}