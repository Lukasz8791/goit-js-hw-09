import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const firstDelay = parseInt(form.elements.delay.value, 10);
  const delayStep = parseInt(form.elements.step.value, 10);
  const amount = parseInt(form.elements.amount.value, 10);

  if (isNaN(firstDelay) || isNaN(delayStep) || isNaN(amount)) {
    Notiflix.Notify.failure('Please fill in all fields with valid numbers.');
    return;
  }

  createPromises(firstDelay, delayStep, amount);
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

function createPromises(firstDelay, delayStep, amount) {
  for (let i = 1; i <= amount; i++) {
    const currentDelay = firstDelay + (i - 1) * delayStep;

    createPromise(i, currentDelay)
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
}
