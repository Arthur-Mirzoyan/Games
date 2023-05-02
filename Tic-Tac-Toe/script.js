let buttons = document.querySelectorAll('button');
let score = document.getElementById('score');
if (player1 == "") player1 = "Player 1";
if (player2 == "") player2 = "Player 2";
document.getElementById('pl1').innerText = player1;
document.getElementById('pl2').innerText = player2;
let winX = 0, winO = 0, clickCount = 0;

let winVariants = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function Clicked(x) {
    let sign = "O";
    let color = "#36b1f3"
    if (clickCount % 2 == 0) { sign = "X"; color = "#f75c45" };
    buttons[x - 1].innerText = sign;
    buttons[x - 1].style.backgroundColor = color;
    buttons[x - 1].disabled = true;
    clickCount++;
    isWin();
}

function isWin() {
    for (let variant of winVariants) {
        let countX = 0, countO = 0;
        variant.map(number => {
            if (buttons[number - 1].innerText == "X") countX++;
            else if (buttons[number - 1].innerText == "O") countO++;
        });
        if (countX == 3) {
            winX++;
            clickCount = 0;
            restart();
        }
        else if (countO == 3) {
            winO++;
            clickCount = 1;
            restart();
        }
        score.innerText = `${winX} : ${winO}`;
    }
    if (!isSpaceLeft()) {
        restart();
        return;
    }
}

function isSpaceLeft() {
    for (let button of buttons) {
        if (button.innerText == "") return true;
    }
    return false;
}

function restart() {
    buttons.forEach(button => {
        button.disabled = false;
        button.innerText = "";
        button.style.backgroundColor = "#fff";
    })
}