import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  seconds: document.querySelector('[data-seconds]'),
  minutes: document.querySelector('[data-minutes]'),
  hours: document.querySelector('[data-hours]'),
  days: document.querySelector('[data-days]'),
};
const TIME_INTERVAL = 1000;

refs.startBtn.setAttribute('disabled', 'button-disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedUserDate = selectedDates[0].getTime();

    if (selectedUserDate <= Date.now()) {
      refs.startBtn.setAttribute('disabled', 'button-disabled');
      return Notiflix.Notify.failure('Please choose a date in the future');
    }

    refs.startBtn.removeAttribute('disabled');
    refs.startBtn.addEventListener('click', startTimer);

    function startTimer() {
      refs.startBtn.setAttribute('disabled', 'button-disabled');
      refs.datePicker.setAttribute('disabled', 'input-disabled');

      const toTargetDate = setInterval(() => {
        const currentDate = Date.now();
        const deltaTime = selectedUserDate - currentDate;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        refs.seconds.textContent = `${seconds}`;
        refs.minutes.textContent = `${minutes}`;
        refs.hours.textContent = `${hours}`;
        refs.days.textContent = `${days}`;

        if (seconds === '00') {
          return clearInterval(toTargetDate);
        }
      }, TIME_INTERVAL);
    }
  },
};
flatpickr(refs.datePicker, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}
