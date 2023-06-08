const backBtn = document.querySelector('.mainMenu');
const startPanel = document.querySelector('.startPanel');
const variantBtns = document.getElementsByClassName('variant');
const startbtn = document.getElementById('start');
const container = document.querySelector('.container');
const box = document.getElementById('box');
const keyboard = document.getElementById('keyboard');
const modal = document.getElementById('modal');
const info = document.getElementById('info');
const [mainMenuBtn, nextLevelBtn] = modal.querySelectorAll('button');
const letterBoxes = [];
const keyboardkeys = [];

var tryNumber = 0, letterIndex = 0, answerIndex = 0, type = 4, words = [];

variantBtns[0].addEventListener('click', () => toggleVariant(0));
variantBtns[1].addEventListener('click', () => toggleVariant(1));
startbtn.addEventListener('click', start);
mainMenuBtn.addEventListener('click', mainMenu);
backBtn.addEventListener('click', mainMenu);


function toggleVariant(index) {
    variantBtns[index].className = 'variant active';
    variantBtns[Math.abs(index - 1)].className = 'variant';
    type = index ? 5 : 4;
}

function start() {
    box.innerHTML = '';
    keyboard.innerHTML = '';
    startPanel.style.display = 'none';
    container.style.display = 'grid';
    drawBoard(type);
    createKeyboard();
    tryNumber = 0, letterIndex = 0, answerIndex = 0, words = [];
    words = type == 4 ? wordsList.four : wordsList.five;
    words = shuffle(words);
    modal.close();
}

function mainMenu() {
    startPanel.style.display = 'flex';
    container.style.display = 'none';
    modal.close();
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function drawBoard(col) {
    box.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
    for (let i = 0; i < col + 1; i++) {
        letterBoxes[i] = [];
        for (let j = 0; j < col; j++) {
            let letterBox = document.createElement('div');
            letterBox.style.backgroundColor = 'lightblue';
            letterBox.className = 'letterBox';
            box.appendChild(letterBox);
            letterBoxes[i][j] = letterBox;
        }
    }
}

function createKeyboard() {
    for (let i = 65; i < 91; i++) {
        let letterBox = document.createElement('button');
        keyboard.appendChild(letterBox);

        let letter = String.fromCharCode(i);

        letterBox.className = 'keys';
        letterBox.addEventListener('click', () => addLetter(letter));
        letterBox.innerText = letter;
        keyboardkeys.push(letterBox);
    }

    let letterBox = document.createElement('button');
    keyboard.appendChild(letterBox);
    letterBox.className = 'keys';
    letterBox.innerText = "<";
    letterBox.style.fontSize = '25px';
    letterBox.addEventListener('click', () => addLetter('Backspace'));

    let submit = document.createElement('button');
    keyboard.appendChild(submit);
    submit.className = 'submitBtn';
    submit.innerText = 'Submit';
    submit.addEventListener('click', checkWword);
}

function addLetter(letter) {
    if (letter == 'Backspace' && 0 < letterIndex) {
        letterBoxes[tryNumber][--letterIndex].innerText = '';
    }
    else if (letterIndex < type && letter != 'Backspace') {
        letterBoxes[tryNumber][letterIndex++].innerText = letter;
    }
}

function getGuess() {
    let result = '';
    for (let i = 0; i < type; i++) {
        result += letterBoxes[tryNumber][i].innerText;
    }

    return result;
}

function checkWword() {
    let guess = getGuess();
    if (guess.length != type) alert(`The word has ${type} letters, not ${guess.length}`);
    else toggleGuess(guess);
}

function toggleGuess(guess) {
    let answer = words[answerIndex];

    if (guess == answer) {
        if (answerIndex + 1 == words.length) showInfo('win');
        else showInfo('next');
        return;
    }

    let [onPlace, exits, dontExist] = checkLetters(answer, guess);

    for (let index of onPlace) {
        letterBoxes[tryNumber][index].style.backgroundColor = 'yellowgreen';
    }

    for (let index of exits) {
        letterBoxes[tryNumber][index].style.backgroundColor = 'orange';
    }

    for (let index of dontExist) {
        letterBoxes[tryNumber][index].style.backgroundColor = 'gray';
    }

    toggleKeyboard(dontExist);

    tryNumber++;
    letterIndex = 0;

    if (tryNumber > type) showInfo('lose');
}

function checkLetters(answer, guess) {
    let answerLetters = answer.split('');
    let guessLetters = guess.split('');
    let onPlace = [], exits = [], dontExist = [];

    for (let i = 0; i < type; i++) {
        if (!answerLetters.includes(guessLetters[i])) {
            dontExist.push(i);
            continue;
        }

        for (let j = 0; j < type; j++) {
            if (guessLetters[i] == answerLetters[j]) {
                if (i == j && !onPlace.includes(j)) {
                    if (exits.includes(j)) exits.splice(exits.indexOf(j), 1);
                    onPlace.push(j);
                }
                else if (!exits.includes(i) && !onPlace.includes(i)) exits.push(i);
            }
        }
    }

    return [onPlace, exits, dontExist];
}

function nextLevel() {
    modal.close()
    tryNumber = 0;
    letterIndex = 0;
    answerIndex++;

    letterBoxes.forEach(arr => {
        arr.forEach(box => {
            box.innerText = '';
            box.style.backgroundColor = 'lightblue';
        })
    })
}

function showInfo(result) {
    let text = '';

    if (result == 'lose' || result == 'win') {
        text = result == 'lose' ? `You Lost. The Word Was '${words[answerIndex]}.'` : 'You Won!!!';
        nextLevelBtn.addEventListener('click', start);
        nextLevelBtn.innerText = 'Play Again';
    }
    else if (result == 'next') {
        text = 'You Guessed The Word!!!';
        nextLevelBtn.addEventListener('click', nextLevel);
        nextLevelBtn.innerText = 'Next Word';
        for (let box of letterBoxes[tryNumber]) box.style.backgroundColor = 'yellowgreen';
    }

    info.innerText = text;
    modal.showModal();
}

function toggleKeyboard(arr) {
    for (let index of arr) {
        let letter = letterBoxes[tryNumber][index].innerText;
        let code = letter.charCodeAt(0);
        keyboardkeys[code - 65].style.backgroundColor = 'gray';
        keyboardkeys[code - 65].disabled = true;
    }
}