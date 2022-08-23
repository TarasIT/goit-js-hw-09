const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;
const TIME_INTERVAL = 1000;
let changeColor = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);
stopBtn.setAttribute('disabled', 'button-disabled');

function onStartBtnClick() {
  if (stopBtn.hasAttribute('disabled')) {
    stopBtn.removeAttribute('disabled');
    startBtn.setAttribute('disabled', 'button-disabled');
    changeColor = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, TIME_INTERVAL);
  }
}

function onStopBtnClick() {
  if (startBtn.hasAttribute('disabled')) {
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', 'button-disabled');
    clearInterval(changeColor);
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
