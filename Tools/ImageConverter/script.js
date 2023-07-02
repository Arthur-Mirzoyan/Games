const input = document.getElementById('input');
const type = document.getElementById('type');
const form = document.querySelector('form');

input.addEventListener('change', () => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);
    let img = document.createElement('img');
    img.style.width = '100px';
    img.style.height = '100px';
    form.appendChild(img);
    img.src = url;
})

function download() {
    try {
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        let a = document.createElement('a');
        a.href = url;
        a.download = `converted.${type.value}`;
        a.click();
    }
    catch (error) { alert("Something went wrong.") }
}