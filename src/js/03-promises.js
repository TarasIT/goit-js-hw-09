import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('[name=delay]'),
  delayStep: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
};

refs.form.addEventListener('submit', onBtnCreatePromisesClick);

function onBtnCreatePromisesClick(event) {
  event.preventDefault();

  const delayStep = parseInt(refs.delayStep.value);
  const amount = parseInt(refs.amount.value);
  let delay = parseInt(refs.firstDelay.value);
  let position = 0;

  while (position !== amount) {
    position += 1;
    if (position !== 1) {
      delay += delayStep;
    }

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
