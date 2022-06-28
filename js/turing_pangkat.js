let num1 = document.getElementById("num1");     // Number 1
let num2 = document.getElementById("num2");     // Number 2

// tampilkan tape
function execute() {
    // jika kondisi terpenuhi
    if (num1.value && num2.value && parseInt(num1.value) > 0 && parseInt(num2.value) > 0) {
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
        // Pembatas
        tapeCells.push(new Cell("1"));
        // Memasukkan 0 sejumlah num2
        for (i = 0; i < num2.value; i++) {
            tapeCells.push(new Cell("0"));
        }
        // Pembatas
        tapeCells.push(new Cell("1"));
        // Blank symbol di akhir tape
        tapeCells.push(new Cell("B"));
        tapeCells.push(new Cell("B"));
        tapeCells.push(new Cell("B"));
    }
}

// Show answer
function showAns() {
    // Pangkat
    let ans = Math.pow(num1.value, num2.value);

    // Menampilkan jawaban
    let ansField = document.getElementById("ans");
    ansField.textContent = ans;
}

// next move button
function executeNextMove() {
    // Pangkat
    // if exist
    if (tapeCells[0]) {
        // Deactivate 
        curCell = document.getElementsByClassName("active");
        for (i = 0; i < curCell.length; i++) {
            curCell[i].className = curCell[i].className.replace(" active", "");
        }

        // STATE 0
        if (state == 0) {
            // 0/B,R ke state 1
            if (tapeCells[it].symbol == "0") {
                move("B", 1, 1);
            }
            // 1/B,R ke state 23
            else if (tapeCells[it].symbol == "1") {
                move("B", 1, 23);
            }
        }

        // STATE 1
        else if (state == 1) {
            // 0/0,R ke state 1
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 1);
            }
            // 1/1,R ke state 2
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 2);
            }
        }

        // STATE 2
        else if (state == 2) {
            // B/B,R ke state 2
            if (tapeCells[it].symbol == "B") {
                move("B", 1, 2);
            }
            // 0/B,R ke state 3
            else if (tapeCells[it].symbol == "0") {
                move("B", 1, 3);
            }
            // 1/1,R ke state 14
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 14);
            }
        }

        // STATE 3
        else if (state == 3) {
            // 0/0,R ke state 3
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 3);
            }
            // 1/1,R ke state 4
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 4);
            }
        }

        // STATE 4
        else if (state == 4) {
            // 0/0,R ke state 4
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 4);
            }
            // X/X,R ke state 4
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 4);
            }
            // B/0,L ke state 5
            else if (tapeCells[it].symbol == "B") {
                move("0", -1, 5, 1);
            }
            // 1/1,L ke state 7
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 7);
            }
        }

        // STATE 5
        else if (state == 5) {
            // 0/0,L ke state 5
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 5);
            }
            // 1/1,L ke state 6
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 6);
            }
        }

        // STATE 6
        else if (state == 6) {
            // 0/0,L ke state 6
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 6);
            }
            // B/B,R ke state 2
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 2);
            }
        }

        // STATE 7
        else if (state == 7) {
            // B/B,L ke state 7
            if (tapeCells[it].symbol == "B") {
                move("B", -1, 7);
            }
            // 0/B,R ke state 8
            else if (tapeCells[it].symbol == "0") {
                move("B", 1, 8);
            }
            // 1/1,R ke state 11
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 11);
            }
            // X/X,R ke state 11
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 11);
            }
        }

        // STATE 8
        else if (state == 8) {
            // B/B,R ke state 8
            if (tapeCells[it].symbol == "B") {
                move("B", 1, 8);
            }
            // 1/1,R ke state 9
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 9);
            }
        }

        // STATE 9
        else if (state == 9) {
            // 0/0,R ke state 9
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 9);
            }
            // B/0,L ke state 10
            else if (tapeCells[it].symbol == "B") {
                move("0", -1, 10, 1);
            }
        }

        // STATE 10
        else if (state == 10) {
            // 0/0,L ke state 10
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 10);
            }
            // 1/1,L ke state 7
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 7);
            }
        }

        // STATE 11
        else if (state == 1) {
            // B/0,R ke state 11
            if (tapeCells[it].symbol == "B") {
                move("0", 1, 11);
            }
            // 1/1,L ke state 12
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 12);
            }
        }

        // STATE 12
        else if (state == 12) {
            // 0/0,L ke state 12
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 12);
            }
            // X/X,L ke state 12
            else if (tapeCells[it].symbol == "X") {
                move("X", -1, 12);
            }
            // 1/1,L ke state 13
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 13);
            }
        }

        // STATE 13
        else if (state == 13) {
            // 0/0,L ke state 13
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 13);
            }
            // B/B,R ke state 2
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 2);
            }
        }

        // STATE 14
        else if (state == 14) {
            // 0/0,R ke state 14
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 14);
            }
            // X/X,R ke state 14
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 14);
            }
            // B/1,L ke state 15
            else if (tapeCells[it].symbol == "B") {
                move("1", -1, 15, 1);
            }
            // 1/X,L ke state 18
            else if (tapeCells[it].symbol == "1") {
                move("X", -1, 18);
            }
        }

        // STATE 15
        else if (state == 15) {
            // 0/0,L ke state 15
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 15);
            }
            // 1/1,L ke state 16
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 16);
            }
        }

        // STATE 16
        else if (state == 16) {
            // B/0,L ke state 16
            if (tapeCells[it].symbol == "B") {
                move("0", -1, 16);
            }
            // 1/1,L ke state 17
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 17);
            }
        }

        // STATE 17
        else if (state == 17) {
            // 0/0,L ke state 17
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 17);
            }
            // B/B,R ke state 0
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 0);
            }
        }

        // STATE 18
        else if (state == 18) {
            // 0/0,L ke state 18
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 18);
            }
            // 1/1,R ke state 19
            else if (tapeCells[it].symbol == "1") {
                move("1", 1, 19);
            }
            // X/X,R ke state 19
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 19);
            }
        }

        // STATE 19
        else if (state == 19) {
            // 0/X,R ke state 19
            if (tapeCells[it].symbol == "0") {
                move("X", 1, 19);
            }
            // X/X,R ke state 20
            else if (tapeCells[it].symbol == "X") {
                move("X", 1, 20);
            }
        }

        // STATE 20
        else if (state == 20) {
            // 0/0,R ke state 20
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 20);
            }
            // B/1,L ke state 21
            else if (tapeCells[it].symbol == "B") {
                move("1", -1, 21);
            }
        }

        // STATE 21
        else if (state == 21) {
            // 0/0,R ke state 21
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 21);
            }
            // 1/1,L ke state 21
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 21);
            }
            // X/X,L ke state 21
            else if (tapeCells[it].symbol == "X") {
                move("X", -1, 21);
            }
            // B/0,L ke state 22
            else if (tapeCells[it].symbol == "B") {
                move("0", -1, 22);
            }
        }

        // STATE 22
        else if (state == 22) {
            // B/0,L ke state 22
            if (tapeCells[it].symbol == "B") {
                move("0", -1, 22);
            }
            // 1/1,L ke state 23
            else if (tapeCells[it].symbol == "1") {
                move("1", -1, 23);
            }
        }

        // STATE 23
        else if (state == 23) {
            // 0/0,L ke state 23
            if (tapeCells[it].symbol == "0") {
                move("0", -1, 23);
            }
            // B/B,R ke state 0
            else if (tapeCells[it].symbol == "B") {
                move("B", 1, 0);
            }
        }

        // STATE 24
        else if (state == 24) {
            // 0/B,R ke state 24
            if (tapeCells[it].symbol == "0") {
                move("B", 1, 24);
            }
            // 1/B,R ke state 25
            else if (tapeCells[it].symbol == "1") {
                move("B", 1, 25);
            }
        }

        // STATE 25
        else if (state == 25) {
            // X/B,R ke state 25
            if (tapeCells[it].symbol == "X") {
                move("B", 1, 25);
            }
            // 0/0,R ke state 26
            else if (tapeCells[it].symbol == "0") {
                move("0", 1, 26);
            }
            // 1/B,R ke state 26
            else if (tapeCells[it].symbol == "1") {
                move("B", 1, 26);
            }
            // B/0,R ke state 27
            else if (tapeCells[it].symbol == "B") {
                move("0", 1, 27);
            }
        }

        // STATE 26
        else if (state == 26) {
            // 0/0,R ke state 26
            if (tapeCells[it].symbol == "0") {
                move("0", 1, 26);
            }
            // 1/B,R ke state 27
            else if (tapeCells[it].symbol == "1") {
                move("B", 1, 27);
            }
        }

        // STATE 27 (FINAL STATE)
        else if (state == 27) {
            reachedEndState();
        }
    }
}