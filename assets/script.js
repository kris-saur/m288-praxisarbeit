// Aussehen

for (var i = 0; i < 20; i++) {
    document.getElementById("box").innerHTML = document.getElementById("box").innerHTML +
        "<div><div class='1'></div><div class='2'></div><div class='3'></div><div class='4'></div><div class='5'></div><div class='6'></div><div class='7'></div><div class='8'></div><div class='9'></div><div class='10'></div></div>";
}

let running = false;
var currentRow = 10;
var length = 10;
var score = 0;
var animatedBlockStart = 0;

function start() {
    fill_box(currentRow, length);
    move(currentRow, length, animatedBlockStart);
    document.getElementById("start").removeAttribute("onclick");
    document.addEventListener("keypress", keyPress);
}

function fill_box(row, length) {
    for (var i = 0; i < length; i++) {
        document.getElementsByClassName(row.toString())[i].style.backgroundColor = '#95c11f';
    }
}

// block funktion
var timerid;
var turn = 'forward';

function move(row, length, animatedBlockStart) {

    timerId = setInterval(() => {
        if (length < 20 && turn == 'forward') {
            // set last block
            document.getElementsByClassName(row.toString())[length].style.backgroundColor = '#95c11f';
            length++;
            // remove first block
            document.getElementsByClassName(row.toString())[animatedBlockStart].style.backgroundColor = '';
            animatedBlockStart++;
        }
        else if (length == 20) {
            length = animatedBlockStart - 1
            animatedBlockStart = 19;
            turn = 'backward';
        }
        else if (length < 20 && turn == 'backward') {
            document.getElementsByClassName(row.toString())[length].style.backgroundColor = '#95c11f';
            length--;
            document.getElementsByClassName(row.toString())[animatedBlockStart].style.backgroundColor = '';
            animatedBlockStart--;
            if (length == -1) {
                length = animatedBlockEnd + 1;
                animatedBlockStart = 0;
                turn = 'forward';
            }
        }
    }, 100);
}

const keyPress = event => {
    if (event.key == ' ') {
        currentRow--;
        if (currentRow == 0) {
            alert("du hast gewonnen !!");
            window.location.reload();
        }
        animatedBlockStart = 0;
        turn = 'forward';
        clearInterval(timerId);
        cutting_extra(currentRow + 1);
        start();
    }
}

function cutting_extra(block) {
    var newLength = 0;
    if (block == 10) {
        newLength = 10;
    }
    else {
        for (var i = 0; i <= 19; i++) {

            currentBlock = document.getElementsByClassName(block.toString())[i];
            nextBlock = document.getElementsByClassName((block + 1).toString())[i];



            if (
                window.getComputedStyle(currentBlock).getPropertyValue("background-color") !=
                window.getComputedStyle(nextBlock).getPropertyValue("background-color")) {
                if (window.getComputedStyle(nextBlock).getPropertyValue("background-color") == 'rgba(0, 0, 0, 0)') {
                    currentBlock.style.backgroundColor = nextBlock.style.backgroundColor;
                }
            }
            else {
                if (window.getComputedStyle(nextBlock).getPropertyValue("background-color") != 'rgba(0, 0, 0, 0)')
                    newLength++;
            }
        }
    }
    length = newLength;
    if (length != 0) {
        score = score + 10;
        document.getElementById("score").innerHTML = score;
    }
    else {
        setTimeout(() => {
            alert("GAME OVER!! DEIN SCORE IST :-" + score);
            window.location.reload();
        }, 100);
    }
}
