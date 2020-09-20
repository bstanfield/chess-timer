const TURN_DURATION = 60;
const PAUSE_TEXT = "Pause";
const PLAY_TEXT = "Resume play";

// needed to account for button press time
const START_BUFFER = 0.1;
let secondsLeft = TURN_DURATION + START_BUFFER;
let paused = false;
let countdown;

function resumeTimer() {
  countdown = setInterval(() => {
    // don't use equality operator for double
    if (0.1 < secondsLeft < 0.2) {
      document.getElementById("seconds").textContent = "Time's up!";
      return;
    }

    secondsLeft = secondsLeft - 0.1;
    const decimalPlaces = secondsLeft < 10 ? 1 : 0;
    document.getElementById("seconds").textContent = secondsLeft.toFixed(decimalPlaces);
  }, 100);
}

function togglePause() {
  if (paused) {
    paused = false;
    document.getElementById("status-indicator").style.display = 'none';
    document.getElementById("pause-play").textContent = PAUSE_TEXT;
    resumeTimer();
  } else {
    paused = true;
    document.getElementById("status-indicator").style.display = 'block';
    document.getElementById("pause-play").textContent = PLAY_TEXT;
    clearInterval(countdown);
  }
}

function start() {
  paused = false;
  document.getElementById("status-indicator").textContent = 'none';
  if (secondsLeft < TURN_DURATION) {
    clearInterval(countdown);
    secondsLeft = TURN_DURATION;
    document.getElementById("pause-play").textContent = PAUSE_TEXT;
  }
  resumeTimer();
}
