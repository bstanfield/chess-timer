const TURN_DURATION = 60;
const PAUSE_TEXT = "Pause";
const PLAY_TEXT = "Resume play";

// needed to account for button press time
const START_BUFFER = 0.1;
let secondsLeft = TURN_DURATION + START_BUFFER;
let paused = false;
let countdown;

// converts htmlCollection -> Array
function getElementsAsArray(className) {
  let elements = document.getElementsByClassName(className);
  return Array.from(elements);
}

function resumeTimer() {
  countdown = setInterval(() => {
    // don't use equality operator for double
    if (0.1 < secondsLeft < 0.2) {
      const counters = getElementsAsArray('seconds');
      counters.map(counter => counter.textContent = "Done!");
      return;
    }

    secondsLeft = secondsLeft - 0.1;
    const decimalPlaces = secondsLeft < 10 ? 1 : 0;
    const counters = getElementsAsArray('seconds');
    counters.map(counter => counter.textContent = secondsLeft.toFixed(decimalPlaces));
  }, 100);
}

function togglePause() {
  if (paused) {
    paused = false;
    // toggle pause emoji
    const indicators = getElementsAsArray('status-indicator');
    indicators.map(i => i.style.display = 'none');

    // toggle pause/play text on btn
    const buttons = getElementsAsArray('pause-play');
    buttons.map(b => b.textContent = PAUSE_TEXT);
    resumeTimer();
  } else {
    paused = true;
    // toggle pause emoji
    const indicators = getElementsAsArray('status-indicator');
    indicators.map(i => i.style.display = 'block');

    // toggle pause/play text on btn
    const buttons = getElementsAsArray('pause-play');
    buttons.map(b => b.textContent = PLAY_TEXT);
    clearInterval(countdown);
  }
}

function start() {
  paused = false;
  const indicators = getElementsAsArray('status-indicator');
  indicators.map(i => i.style.display = 'none');
  if (secondsLeft < TURN_DURATION) {
    clearInterval(countdown);
    secondsLeft = TURN_DURATION;
    const buttons = getElementsAsArray('pause-play');
    buttons.map(b => b.textContent = PAUSE_TEXT);
  }
  resumeTimer();
}
