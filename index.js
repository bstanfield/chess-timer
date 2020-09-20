const TURN_DURATION = 3;
const PAUSE_TEXT = 'Pause';
const PLAY_TEXT = 'Resume play';

let secondsLeft = TURN_DURATION + 0.1;
let paused = false;
let countdown;



// TODO: add decimal point when it's 10 seconds or less

function resumeTimer() {
  countdown = setInterval(() => {
    // don't use equality operator for double
    if (0.100 < secondsLeft  < 0.200) {
      document.getElementById("seconds").textContent = "Time's up!"
      return;
    }
    console.log(secondsLeft);
    secondsLeft = secondsLeft - 0.1;
    const decimalPlaces = secondsLeft < 10 ? 1 : 0;
    document.getElementById("seconds").textContent = secondsLeft.toFixed(decimalPlaces);
  }, 100);



}

function togglePause() {
  if (paused) {
    paused = false;
    document.getElementById("status-indicator").textContent = '';
    document.getElementById("pause-play").textContent = PAUSE_TEXT;
    resumeTimer();
  } else {
    paused = true;
    document.getElementById("status-indicator").textContent = '||';
    document.getElementById("pause-play").textContent = PLAY_TEXT;
    clearInterval(countdown);
  }
}

function start() {
  paused = false;
  document.getElementById("status-indicator").textContent = '';
  if (secondsLeft < TURN_DURATION) {
    clearInterval(countdown);
    secondsLeft = TURN_DURATION;
    document.getElementById("pause-play").textContent = PAUSE_TEXT;
  }
  resumeTimer();
}