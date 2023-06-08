const words = new Words();
const round = document.getElementById('round');
const infoBox = document.getElementById('infoBox');
const imgBox = document.getElementById('imgBox');
const wordHintBox = document.getElementById('wordHintBox');
const playerBox = document.getElementById('playerBox');
const maxMistakes = 8;

var data = shuffle(words.wordsList);
var mistakes = 1;
var level = 1;

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function findLetterIndexes(word, letter) {
    let indexes = [];

    for (let i = 0; i < word.length; i++) {
        if (word[i] == letter) indexes.push(i);
    }

    return indexes;
}

function nextLevel(level = 1) {
    if (level > data.length) {
        theEnd();
        return;
    }

    round.innerText = `Round ${level} : ${data.length}`;
    let word = data[level - 1].word;
    let hint = data[level - 1].hint;

    word = word.toUpperCase();
    word = word.replace(/[^A-Z]+/g, "");

    for (let i = 0; i < word.length; i++) {
        let letterBox = document.createElement('div');
        letterBox.className = 'letterBox';
        wordHintBox.appendChild(letterBox);
    }

    let hintLine = document.createElement('p');
    hintLine.className = 'hintLine';
    wordHintBox.appendChild(hintLine);
    hintLine.innerText = hint;

    createKeyboard(word);
}

function createKeyboard(word) {
    for (let i = 65; i < 91; i++) {
        let letterBox = document.createElement('button');
        playerBox.appendChild(letterBox);

        let letter = String.fromCharCode(i);

        letterBox.className = 'keys';
        letterBox.addEventListener('click', () => checkLetter(word, letter, i));
        letterBox.innerText = letter;
    }
}

function checkLetter(word, letter, code) {
    const letterIndex = code - 65;
    const letters = document.getElementsByClassName('letterBox');
    const keys = document.getElementsByClassName('keys');

    if (word.includes(letter)) {
        let indexes = findLetterIndexes(word, letter);
        indexes.forEach(index => letters[index].innerText = letter);
        keys[letterIndex].style.backgroundColor = "#9de159";
    }
    else {
        keys[letterIndex].style.backgroundColor = "tomato";
        imgBox.src = `img/steps_0${mistakes++}.png`;
    }

    keys[letterIndex].disabled = true;

    if (isWin(word, letters)) restart(++level);

    if (mistakes == 8) replay(word);
}

function replay(word) {
    wordHintBox.innerHTML = '';
    playerBox.innerHTML = '';

    let p = document.createElement('p');
    p.innerText = `The word was '${word}'.`;
    p.className = "answer";

    let btn = document.createElement('button');
    btn.className = "playAgainBtn";
    btn.innerText = "Play Again";
    btn.addEventListener('click', () => restart());

    wordHintBox.appendChild(p);
    playerBox.appendChild(btn);
}

function restart(level = 1) {
    wordHintBox.innerHTML = '';
    playerBox.innerHTML = '';
    mistakes = 1;

    imgBox.src = `img/steps_00.png`;
    if (level == 1) data = shuffle(words.wordsList);
    nextLevel(level);
}

function isWin(word, letters) {
    let count = 0;

    for (let item of letters) if (item.innerText != '') count++;

    return count == word.length;
}

function theEnd() {
    let body = document.querySelector('body');
    body.innerHTML = '';
    body.innerHTML = '<h1>You won the game!</h1>';
}

nextLevel();