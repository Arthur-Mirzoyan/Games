class Keyboard {
    #rows = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ];
    #input = document.getElementById('inputbox');
    #inputText = document.getElementById('inputtext');
    #dialog = document.querySelector('dialog');
    #stopwatchBlock = document.getElementById('timer');
    #stopwatch = new Stopwatch(this.#stopwatchBlock);
    #iterator = this.#nextWord();
    #start = false;
    #words = data[Math.floor(Math.random() * data.length)];
    #currentWord;

    constructor(textbox) {
        textbox.innerText = this.#words;
        this.#words = this.#words.split(' ');
        this.board = document.getElementById('keyboard');
        this.row1 = document.getElementById('row1');
        this.row2 = document.getElementById('row2');
        this.row3 = document.getElementById('row3');
        this.keys = {};
    }

    generate() {
        for (let i = 0; i < this.#rows.length; i++) {
            let row;
            if (i == 0) row = this.row1;
            else if (i == 1) row = this.row2;
            else row = this.row3;

            for (let letter of this.#rows[i]) {
                let key = document.createElement('div');
                key.className = 'key';
                key.innerText = letter;
                row.appendChild(key);
                keyboard.keys[letter] = key;
            }
        }

        let space = document.createElement('div');
        space.className = "key space";
        space.innerText = "space";
        this.board.appendChild(space);
        this.keys[' '] = space;
    }

    toggleChange() {
        // Start stopwatch
        if (!this.#start) {
            this.#start = true;
            this.#input.placeholder = "";
            this.#showNextWord();
            this.#stopwatch.start();
        }

        // The End ?
        if (this.#currentWord === true) return;

        // Checking the written word
        if (this.#input.value.trim() === this.#currentWord) { this.#input.value = ''; this.#showNextWord(); }
        else this.#wordCheck();

        let last = this.#input.value[this.#input.value.length - 1];
        let key = this.keys[last?.toLowerCase()];

        if (key) {
            key.style.backgroundColor = 'var(--key-down-color)';
            key.style.color = 'var(--contrast-color)';
            key.style.zIndex = '2';
            key.style.boxShadow = 'inset 6px 7px 10px 0px var(--shadow-color)';

            setTimeout(() => {
                key.style.backgroundColor = 'var(--key-color)';
                key.style.color = 'white';
                key.style.zIndex = '1';
                key.style.boxShadow = '6px 7px 10px 0px var(--shadow-color)';
            }, 125);
        }
    }

    * #nextWord() {
        for (let i = 0; i < this.#words.length; i++) {
            yield this.#words[i];
        }

        return true;
    }

    #showNextWord() {
        this.#currentWord = this.#iterator.next().value;
        if (this.#currentWord === true) {
            this.#theEnd();
            return;
        }
        this.#inputText.innerText = this.#currentWord;
    }

    #wordCheck() {
        let word = this.#currentWord,
            input = this.#input.value.trim();

        if (word == input) return true;
        else {
            let x = "";
            for (let i = 0; i < word.length; i++) {
                if (input[i] == word[i]) x += word[i];
                else x += `<span style="color: red">${word[i]}</span>`;
            }

            this.#inputText.innerHTML = "";
            this.#inputText.innerHTML = x;
        }
    }

    #theEnd() {
        this.#inputText.innerText = "You Have Done !!!"
        this.#stopwatch.stop();

        let time = this.#stopwatchBlock.innerText.split(":").map(item => parseInt(item));
        let speed = time[time.length - 1] / 1000 + time[time.length - 2];

        for (let i = time.length - 3; i >= 0; i--) speed += (time[i] * 60);
        if (time.length == 4) speed += (time[0] * 60);
        speed /= 60;

        this.#dialog.children[0].children[1].innerHTML = "";
        this.#dialog.children[0].children[1].innerHTML =
            `<p>${time.join(' : ')}</p><p>Speed: ${Math.round(this.#words.length / speed)} WPM</p>`;

        this.#dialog.showModal();
    }
}