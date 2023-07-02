const body = document.querySelector('body');
const menuMore = document.getElementById('menuMore');
const menu = document.querySelector('dialog');

menuMore.addEventListener('click', () => {
    menu.showModal();

    body.style.height = "100vh";
    body.style.overflow = "hidden";

    menu.addEventListener('click', event => {
        let dimensions = menu.getBoundingClientRect();

        if (event.clientX < dimensions.left || event.clientX > dimensions.right ||
            event.clientY < dimensions.top || event.clientY > dimensions.bottom) {
            menu.close();

            body.style.height = "auto";
            body.style.overflow = "auto";
        }

    });
});

function toggleDialog() {
    menu.close();
}