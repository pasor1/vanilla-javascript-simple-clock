'use strict'

const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

function setClock() {
  const now = new Date();

  const angleHour = (((now.getHours() % 12) * 30) + (now.getMinutes() * 30 / 60));
  const angleMinute = ((now.getMinutes() * 6) + (now.getSeconds() * 6 / 60));
  const angleSecond = (now.getSeconds() * 6);

  secondHand.style.transform = `rotate(${angleSecond}deg)`;
  minuteHand.style.transform = `rotate(${angleMinute}deg)`;
  hourHand.style.transform = `rotate(${angleHour}deg)`;
}

document.addEventListener("DOMContentLoaded", () => {
  setClock();
  document.getElementById('clock').style.opacity = '1';
  setInterval(() => setClock(), 1000)
})

