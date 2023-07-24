const inputbox = document.getElementById('inputbox');
const textbox = document.getElementById('textbox');
const dialog = document.querySelector('dialog');

var keyboard;

inputbox.addEventListener('input', () => keyboard.toggleChange())

window.addEventListener('load', () => {
    keyboard = new Keyboard(textbox);
    keyboard.generate();
});

function restart() {
    dialog.close();
    keyboard = new Keyboard(textbox);
    document.getElementById('inputtext').innerText = "";
    document.getElementById('timer').innerText = "0 : 000";
}