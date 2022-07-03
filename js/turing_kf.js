let num1 = document.getElementById("num1");     // Number 1

// tampilkan tape
function execute() {
    // jika kondisi terpenuhi
    if (num1.value && parseInt(num1.value) >= 32) {
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
        tapeCells.push(new Cell("B"));
        tapeCells.push(new Cell("B"));
        tmTape.childNodes[6].className += " active";
        it = 7; // Awal head
        state = 0; // Awal state

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
        tapeCells.push(new Cell("-"));

        // Memasukkan binary dari 273
        tapeCells.push(new Cell("1"));
        tapeCells.push(new Cell("0"));
        tapeCells.push(new Cell("0"));
        tapeCells.push(new Cell("0"));
        tapeCells.push(new Cell("1"));
        tapeCells.push(new Cell("0"));
        tapeCells.push(new Cell("0"));
        tapeCells.push(new Cell("0"));
        tapeCells.push(new Cell("1"));

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
    let ans = ((parseInt(num1.value) - 273) * 2 ) + 32;

    // Menampilkan jawaban
    let ansField = document.getElementById("ans");
    ansField.textContent = ans + "\u00B0C";
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

        // STATE 0
        if (state == 0) {
            // 0 / 0 , R to state 0
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 0);
            }
            // 1 / 1 , R to state 0
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 0);
            }
            // - / - , R to state 0
            else if (tapeCells[it].symbol == "-") {
                move("-", 1, 0);
            }
            // + / + , L to state 1
            else if (tapeCells[it].symbol == "+") {
                move("+", -1, 1);
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
            // - / + , L to state 9
            else if (tapeCells[it].symbol == "-") {
                move("+", -1, 9);
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
            // - / - , L to state 3
            else if (tapeCells[it].symbol == "-") {
                move("-", -1, 3);
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
            // 1 / X, R to state 4
            else if (tapeCells[it].symbol == "1") {
                move("X", 1, 4);
            }
            // 0 / Y, L to state 5
            else if (tapeCells[it].symbol == "0") {
                move("Y", -1, 5);
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
            // - / - , R to state 4
            else if (tapeCells[it].symbol == "-") {
                move("-", 1, 4);
            }
            // C / 1 , L to state 1
            else if (tapeCells[it].symbol == "C") {
                move("1", -1, 1);
            }
        }

        // STATE 5
        else if (state == 5) {
            // 0 / 1 , L to state 5
            if (tapeCells[it].symbol == "0") {
                move("1", -1, 5);
            }
            // 1 / 0 , R to state 4
            else if (tapeCells[it].symbol == "1") {
                move("0", 1, 4);
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
            // - / - , L to state 7
            else if (tapeCells[it].symbol == "-") {
                move("-", -1, 7);
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
            // - / - , R to state 8
            else if (tapeCells[it].symbol == "-") {
                move("-", 1, 8);
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
            // + / 0 , R to state 11
            else if (tapeCells[it].symbol == "+") {
                move("0", 1, 11);
            }
        }

        // STATE 11
        else if (state == 11) {
            // 0 / + , R to state 11
            if (tapeCells[it].symbol == "0") {
                move("+", 1, 11);
            }
            // 1 / + , R to state 11
            else if (tapeCells[it].symbol == "1") {
                move("+", 1, 11);
            }
            // + / + , R to state 100
            else if (tapeCells[it].symbol == "+") {
                move("+", 1, 100);
            }
        }

        // STATE 100
        else if (state == 100) {
            // 0 / 0 , R to state 100
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 100);
            }
            // 1 / 1 , R to state 100
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 100);
            }
            // + / + , R to state 100
            else if (tapeCells[it].symbol == "+") {
                move("+", 1, 100);
            }
            // B / B , L to state 101
            else if (tapeCells[it].symbol == "B") {
                move("B", -1, 101);
            }
        }

        // STATE 101
        else if (state == 101) {
            // 1 / C , L to state 102
            if (tapeCells[it].symbol == "1") {
                move("C", -1, 102);
            }
            // 0 / C , L to state 106
            else if (tapeCells[it].symbol == "0") {
                move("C", -1, 106);
            }
            // + / B , L to state 109
            else if (tapeCells[it].symbol == "+") {
                move("B", -1, 109);
            }
        }

        // STATE 102
        else if (state == 102) {
            // 0 / 0 , L to state 102
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 102);
            }
            // 1 / 1 , L to state 102
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 102);
            }
            // + / + , L to state 3
            else if (tapeCells[it].symbol == "+") {
                move("+", -1, 103);
            }
        }

        // STATE 103
        else if (state == 103) {
            // X / X, L to state 103
            if (tapeCells[it].symbol == "X") {
                move("X", -1, 103);
            }
            // Y / Y, L to state 103
            else if (tapeCells[it].symbol == "Y") {
                move("Y", -1, 103);
            }
            // + / + , L to state 103
            else if (tapeCells[it].symbol == "+") {
                move("+", -1, 103);
            }
            // 0 / Y, R to state 104
            else if (tapeCells[it].symbol == "0") {
                move("Y", 1, 104);
            }
            // B / Y, R to state 104
            else if (tapeCells[it].symbol == "B") {
                move("Y", 1, 104);
            }
            // 1 / X, L to state 105
            else if (tapeCells[it].symbol == "1") {
                move("X", -1, 105);
            }
        }

        // STATE 104
        else if (state == 104) {
            // 0 / 0 , R to state 104
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 104);
            }
            // 1 / 1 , R to state 104
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 104);
            }
            // X / X , R to state 104
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 104);
            }
            // Y / Y , R to state 104
            else if (tapeCells[it].symbol == "Y") {
                move("Y", 1, 104);
            }
            // + / + , R to state 104
            else if (tapeCells[it].symbol == "+") {
                move("+", 1, 104);
            }
            // C / 1 , L to state 101
            else if (tapeCells[it].symbol == "C") {
                move("1", -1, 101);
            }
        }

        // STATE 105
        else if (state == 105) {
            // 1 / 0 , L to state 105
            if (tapeCells[it].symbol == "1") {
                move("0", -1, 105);
            }
            // 0 / 1 , R to state 104
            else if (tapeCells[it].symbol == "0") {
                move("1", 1, 104);
            }
            // B / 1 , R to state 104
            else if (tapeCells[it].symbol == "B") {
                move("1", 1, 104);
            }
        }

        // STATE 106
        else if (state == 106) {
            // 0 / 0 , L to state 106
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 106);
            }
            // 1 / 1 , L to state 106
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 106);
            }
            // + / + , L to state 107
            else if (tapeCells[it].symbol == "+") {
                move("+", -1, 107);
            }
        }

        // STATE 107
        else if (state == 107) {
            // X / X , L to state 107
            if (tapeCells[it].symbol == "X") {
                move("X", -1, 107);
            }
            // Y / Y , L to state 107
            else if (tapeCells[it].symbol == "Y") {
                move("Y", -1, 107);
            }
            // + / + , L to state 107
            else if (tapeCells[it].symbol == "+") {
                move("+", -1, 107);
            }
            // B / X , R to state 108
            else if (tapeCells[it].symbol == "B") {
                move("X", 1, 108);
            }
            // 1 / Y , R to state 108
            else if (tapeCells[it].symbol == "1") {
                move("Y", 1, 108);
            }
            // 0 / X , R to state 108
            else if (tapeCells[it].symbol == "0") {
                move("X", 1, 108);
            }
        }

        // STATE 108
        else if (state == 108) {
            // 0 / 0 , R to state 108
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 108);
            }
            // 1 / 1 , R to state 108
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 108);
            }
            // X / X , R to state 108
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 108);
            }
            // Y / Y , R to state 108
            else if (tapeCells[it].symbol == "Y") {
                move("Y", 1, 108);
            }
            // + / + , R to state 108
            else if (tapeCells[it].symbol == "+") {
                move("+", 1, 108);
            }
            // C / 0 , L to state 101
            else if (tapeCells[it].symbol == "C") {
                move("0", -1, 101);
            }
        }

        // STATE 109
        else if (state == 109) {
            // 0 / 0, L to state 109
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 109);
            }
            // 1 / 1, L to state 109
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 9);
            }
            // Y / 1, L to state 109
            else if (tapeCells[it].symbol == "Y") {
                move("1", -1, 109);
            }
            // X / 0, L to state 109
            else if (tapeCells[it].symbol == "X") {
                move("0", -1, 109);
            }
            // B / B, R to state 110
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 110);
            }
            // + / B , L to state 109
            else if (tapeCells[it].symbol == "+") {
                move("B", -1, 109);
            }
        }

        // STATE 110
        else if (state == 110) {
            // 0 / 0 , R to state 110
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 110);
            }
            // 1 / 1 , R to state 110
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 110);
            }
            // B / B , R to state 111
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 111);
            }
        }

        // STATE 111
        else if (state == 111) {
            // B / B , R to state 111
            if (tapeCells[it].symbol == "B") {
                move("B", 1, 111);
            }
            // 0 / B , R to state 112
            else if (tapeCells[it].symbol == "0") {
                move("B", 1, 112);
            }
            // 1 / B , R to state 112
            else if (tapeCells[it].symbol == "1") {
                move("B", 1, 112);
            }
        }
        
        // STATE 112
        else if (state == 112) {
            // 0 / B , R to state 112
            if (tapeCells[it].symbol == "0") {
                move("B", 1, 112);
            }
            // 1 / B , R to state 112
            else if (tapeCells[it].symbol == "1") {
                move("B", 1, 112);
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