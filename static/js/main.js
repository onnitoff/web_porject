/*
    MODALS
*/

const popupLinks = document.querySelectorAll('.popup-link'); // получение всех popup
const body = document.querySelector('body'); // получаем body чтобы блокировать скрол
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true; // переменная для исключения двойных нажатий


const timeout = 500; // для transition

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', (e) => {
            const popupName = popupLink.getAttribute('href').replace('#', ''); 
            const curentPopup = document.getElementById(popupName); //получем обьект popup
            popupOpen(curentPopup); //вызываем popupOpen
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup'); //закрытие popup
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', (e) => {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) { //проверка и закрытие открытых popup
        const popupActive = document.querySelector('.popup.open');
        if(popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock(); //скрытие скрола
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', (e) => {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if(unlock) {
        popupActive.classList.remove('open');
        if(doUnlock) {
            bodyUnLock(); //разблокирование скрола
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'; //расчет толщины скролла
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(() => { unlock = true }, timeout);
}

function bodyUnLock() {
    setTimeout(() => {
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(() => {unlock = true;}, timeout);
}


/* COUNTER */
