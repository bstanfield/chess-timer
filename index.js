let secondsLeft = 60;
let paused = false;
let countdown;

function togglePause() {
  if (paused) {
    document.getElementById("status-indicator").textContent = '';
    paused = false;
    countdown = setInterval(() => {
      secondsLeft--;
      document.getElementById("seconds").textContent = secondsLeft;
    }, 1000);
  } else {
    paused = true;
    document.getElementById("status-indicator").textContent = '||';
    clearInterval(countdown);
  }
}

function start() {
  paused = false;
  document.getElementById("status-indicator").textContent = '';
  if (secondsLeft < 60) {
    clearInterval(countdown);
    secondsLeft = 61;
  }
  countdown = setInterval(() => {
    secondsLeft--;
    document.getElementById("seconds").textContent = secondsLeft;
  }, 1000);
}