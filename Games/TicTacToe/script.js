const menu = document.getElementsByClassName('menu')[0],
    board = [document.getElementsByClassName('infoDesk')[0], document.getElementsByClassName('display')[0]];
const btn1 = document.getElementById('btn1'),
    btn2 = document.getElementById('btn2');
const buttons = document.querySelectorAll('.fields');
const scoreX = document.getElementById('score1'),
    scoreO = document.getElementById('score2');
const colorX = "#df381f",
    colorO = "#36b1f3";
const winVariants = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7]
];

var gameMode = 1, winX = 0, winO = 0, clickCount = 0, sign = "O", color = colorO;
var player1, player2;


function changeMode(mode) {
    gameMode = mode;
    if (mode == 1) {
        btn1.className = "active";
        btn2.className = "";
    }
    else {
        btn2.className = "active";
        btn1.className = "";
    }
}

function startGame() {
    menu.style.display = "none";
    board.forEach(block => block.style.display = "grid");
    if (gameMode == 1) {
        player1 = "AI";
        player2 = prompt("Enter Your name.");
        clicked(5);
        AIStep++;
    }
    else if (gameMode == 2) {
        player1 = prompt("Player 1 name: ");
        player2 = prompt("Player 2 name: ");
        player1 = player1 || "Player 1";
    }

    player2 = player2 || "Player 2";

    document.getElementById('pl1').innerText = player1;
    document.getElementById('pl2').innerText = player2;
}

function clicked(x) {
    steps.push(x);
    colorizeInfoDesk(color);

    if (gameMode == 1 && sign == "X") thinkAI();

    sign = sign == "O" ? "X" : "O";
    color = color == colorO ? colorX : colorO;

    buttons[x - 1].innerText = sign;
    buttons[x - 1].style.backgroundColor = color;
    buttons[x - 1].disabled = true;

    allSteps = allSteps.filter(elem => elem !== x);
    if (angles.includes(x)) angles = angles.filter(elem => elem !== x);

    clickCount++;
    isWin();
}

function isWin() {
    for (let variant of winVariants) {
        let countX = 0, countO = 0;
        variant.forEach(number => {
            if (buttons[number - 1].innerText == "X") countX++;
            else if (buttons[number - 1].innerText == "O") countO++;
        });
        if (countX == 3) {
            winX++;
            restart();
        }
        else if (countO == 3) {
            winO++;
            restart();
        }
        scoreX.innerText = winX;
        scoreO.innerText = winO;
    }
    if (clickCount >= 9) restart("tie");
}

function restart(result) {
    if (result != "tie") {
        sign = sign == "O" ? "X" : "O";
        colorizeInfoDesk(color);
        color = color == colorO ? colorX : colorO;
    }

    allSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9], angles = [1, 3, 7, 9], steps = [], clickCount = 0;

    setTimeout(() => {
        AIStep = 0;
        if (gameMode == 1 && sign == "O") thinkAI();



        buttons.forEach(button => {
            button.disabled = false;
            button.innerText = "";
            button.style.backgroundColor = "#fff";
        })
    }, 100);
}

function colorizeInfoDesk(color, time = 0) {
    color = color == colorX ? "#F98A76" : "#99C2D6";

    setTimeout(() => {
        board[0].style.backgroundColor = color;
        board[0].style.opa
    }, time);
}


// >>>>>>>>>>>>>>>>>>>>>>>>> AI

const AISteps = {
    1: 9, 9: 1,
    2: 8, 8: 2,
    3: 7, 7: 3,
    4: 6, 6: 4
}
var allSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9], angles = [1, 3, 7, 9], steps = [], AIStep = 0;

function findWinningLine(sign_) {
    for (let variant of winVariants) {
        let count = 0;
        for (let step of steps) {
            if (variant.includes(step) && buttons[step - 1].innerText == sign_) count++;
        }

        if (count == 2) {
            for (let box of variant)
                if (!steps.includes(box)) return box;
        }
    }

    return null;
}

function thinkAI() {
    setTimeout(() => {
        // First step for AI
        if (AIStep == 0) {
            // Try center
            if (allSteps.includes(5)) clicked(5);
            // Try angle
            else clicked(angles[Math.floor(Math.random() * angles.length)]);
        }

        // Second step for AI
        else if (AIStep == 1) {
            // Checking corresponding angle
            let last = steps[steps.length - 1];
            if (allSteps.includes(AISteps[last])) clicked(AISteps[last]);
            else clicked(angles[Math.floor(Math.random() * angles.length)]);
        }

        // Other steps for AI
        else if (AIStep >= 2) {
            // Checking winning line for AI
            let find = findWinningLine("X");
            if (find) clicked(find);

            // CHecking winning line for Player
            else {
                find = findWinningLine("O");
                if (find) clicked(find);
                else clicked(allSteps[Math.floor(Math.random() * allSteps.length)]);
            }
        }
        AIStep++;
    }, 125)
}