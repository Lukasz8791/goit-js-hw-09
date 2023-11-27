import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate > new Date()) {
      startButton.disabled = false;
    } else {
      showAlert('Please choose a date in the future');
      startButton.disabled = true;
    }
  },
};

flatpickr('#datetime-picker', options);

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const alertElement = document.getElementById('alert');

let countdownInterval;

startButton.addEventListener('click', () => {
  const selectedDate = flatpickr('#datetime-picker').selectedDates;

  if (!selectedDate || selectedDate[0] <= new Date()) {
    showAlert('Please choose a valid future date');
    return;
  }

  startButton.disabled = true;

  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDifference = selectedDate[0] - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      resetTimer();
      showAlert('Countdown complete!');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimer(
      addLeadingZero(days),
      addLeadingZero(hours),
      addLeadingZero(minutes),
      addLeadingZero(seconds)
    );
  }, 1000);
});

function resetTimer() {
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
}

function updateTimer(days, hours, minutes, seconds) {
  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function showAlert(message) {
  alertElement.textContent = message;
  alertElement.style.display = 'block';
  setTimeout(() => {
    alertElement.style.display = 'none';
  }, 3000);
}
