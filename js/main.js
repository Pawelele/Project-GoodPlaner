const menuBurger = document.querySelector('.burger-menu');
const menu = document.querySelector('.menu');

const clock = document.querySelector('.clock p');


const showDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()<=9 ? '' + date.getMonth()+1 : date.getMonth()+1;
    const year = date.getFullYear();
    const hours = date.getHours()<=9 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes()<=9 ? '0' + date.getMinutes() : date.getMinutes();

    clock.textContent = `${day}.${month}.${year} ${hours}:${minutes}`;
}

const showMenu = () => {
    menu.classList.toggle('menu-active');
}


menuBurger.addEventListener('click', showMenu);

showMenu();
showDate();
window.setInterval(showDate, 5000);