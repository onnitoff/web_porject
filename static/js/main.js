/* VALIDATION */
const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[id="number"]');
   phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
    
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            // неполучилось сделать модалку на возврат инфы с сервера..
            // road = добавить a + id button новую модалку id="popup_3"
            // let statusMessage = document.querySelector('.status-message');
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            console.log("check");
            postData('server.php', formData)
                .then(res => {

                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
/*
    MODALS
*/

const popupLinks = document.querySelectorAll('.popup-link'); // получение всех popup
const body = document.querySelector('body'); // получаем body чтобы блокировать скрол
const lockPadding = document.querySelectorAll('.lock-padding');
const input = document.querySelector('.phone');

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

const popupCloseBeforeSend = document.querySelectorAll('.button_close-popup');
if(popupCloseBeforeSend.length > 0 && input.value.length == 0) {
    for (let index = 0; index < popupCloseBeforeSend.length; index++) {
        const el = popupCloseBeforeSend[index];
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
let buttonCountPlus = document.getElementById("buttonCountPlus");
let buttonCountMinus = document.getElementById("buttonCountMinus");
let count = document.getElementById("buttonCountNumber");
let count2 = document.getElementById("num");
let number = 1;

buttonCountPlus.onclick = function() {
    if (number <= 9) {
        number++;
        count.innerHTML = number;
    }
};

buttonCountMinus.onclick = function() {
   if (number >= 2) {
       number--;
       count.innerHTML = number;
    }
};


/* TIMER */
document.addEventListener('DOMContentLoaded', function() {
    // конечная дата, например 1 июля 2021
    const deadline = new Date(2023, 10, 8);
    // id таймера
    let timerId = null;
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
      const diff = deadline - new Date();
      if (diff <= 0) {
        clearInterval(timerId);
      }
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      $hours.textContent = hours < 10 ? '0' + hours : hours;
      $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
      $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    }
    // получаем элементы, содержащие компоненты даты
    const $hours = document.querySelector('.timer__hours');
    const $minutes = document.querySelector('.timer__minutes');
    const $seconds = document.querySelector('.timer__seconds');
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);
});




