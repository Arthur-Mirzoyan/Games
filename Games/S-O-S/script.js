const game = document.getElementById('game');
const board = document.getElementById('board');
const player1Box = document.getElementById('player1');
const player2Box = document.getElementById('player2');
const player1Score = document.getElementById('player1Score');
const player2Score = document.getElementById('player2Score');
const buttonS = document.getElementById('btnS');
const buttonO = document.getElementById('btnO');

const keys = [];
const width = board.clientWidth;
const height = board.clientHeight;
const length = Math.min(width, height);
const size = 50;
const count = parseInt(length / size);

var freeSpaceLeft = count * count;
var symbol = 'S';
var pl1 = 0, pl2 = 0;
var player = 0;

function drawBoard(count) {
    board.style.gridTemplateColumns = `repeat(${count}, 1fr)`;

    for (let i = 0; i < count; i++) {
        keys[i] = [];
        for (let j = 0; j < count; j++) {
            let btn = document.createElement('button');
            board.appendChild(btn);

            keys[i][j] = btn;
            btn.addEventListener('click', () => addSymbol(i, j));

            btn.style.width = `100%`;
            btn.style.aspectRatio = '1 / 1';
        }
    }
}

function setInfo(pl1, pl2) {
    player1Box.innerText = player1;
    player2Box.innerText = player2;
    player1Score.innerText = pl1;
    player2Score.innerText = pl2;
}

function changeSymbol(letter) {
    symbol = letter;
    if (letter == 'S') {
        buttonS.className = "active";
        buttonO.className = "";
    }
    else {
        buttonO.className = "active";
        buttonS.className = "";
    }
}

function addSymbol(i, j) {
    freeSpaceLeft--;
    keys[i][j].innerText = symbol;
    keys[i][j].disabled = true;

    if (isEnd(pl1, pl2)) return;

    let points = checkSOS(i, j, symbol);

    if (points) {
        player % 2 == 0 ? pl1 += points : pl2 += points;
        setInfo(pl1, pl2);
    }
    else {
        if (player % 2 == 0) {
            player1Box.className = "";
            player2Box.className = "playing";
            player1Score.className = "";
            player2Score.className = "playing";
        }
        else {
            player2Box.className = "";
            player1Box.className = "playing";
            player2Score.className = "";
            player1Score.className = "playing";
        }
        player++;
    }
}

function checkSOS(i, j, symbol) {
    let sos = new SOSchecker(i, j);
    let data = sos.variantsForS;
    let letter1 = 'O', letter2 = 'S';
    let count = 0;

    if (symbol == 'O') {
        letter1 = 'S';
        data = sos.variantsForO;
    }

    for (let variant of data) {
        let ox = variant.O.x;
        let oy = variant.O.y;
        let sx = variant.S.x;
        let sy = variant.S.y;

        if (keys?.[oy]?.[ox]?.innerText == letter1 && keys?.[sy]?.[sx]?.innerText == letter2) {
            keys[oy][ox].style.backgroundColor = 'green';
            keys[sy][sx].style.backgroundColor = 'green';
            keys[i][j].style.backgroundColor = 'green';
            count++;
        }
    }

    return count;
}

function isEnd(pl1, pl2) {
    if (freeSpaceLeft == 0) {
        game.innerHTML = '';

        let winner = player1;
        if (pl1 == pl2)
            game.innerHTML = `<h1>It's a tie.</h1><br><h2>${player1} : ${pl1}</h2><br><h2>${player2} : ${pl2}</h2>`;

        else if (pl2 > pl1) {
            winner = player2;
            game.innerHTML = `<h1>Winner is : ${winner}</h1><br><h2>${player1} : ${pl1}</h2><br><h2>${player2} : ${pl2}</h2>`;
        }

        game.innerHTML = game.innerHTML + `<br><button onclick="restart()">Play Again</button>`;
        return true;
    }
}

function restart() {
    location.reload();
}

// ----------------------------------------- //

drawBoard(count, size);
setInfo(pl1, pl2);