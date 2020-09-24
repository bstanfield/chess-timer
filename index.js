const TURN_DURATION = 3;
const PAUSE_TEXT = "Pause";
const PLAY_TEXT = "Resume play";
const RESERVE_TIME = 30;

// needed to account for button press time
const START_BUFFER = 0.1;
let secondsLeft = TURN_DURATION + START_BUFFER;
let paused = false;
let countdown;
let reserveCountdown;

let activePlayerId = 1;

let reserveTimeById = {
  1: RESERVE_TIME,
  2: RESERVE_TIME,
}

// converts htmlCollection -> Array
function getElementsAsArray(className) {
  let elements = document.getElementsByClassName(className);
  return Array.from(elements);
}

function resumeTimer() {
  while (secondsLeft > 0.2) {
    console.log(secondsLeft);
    countdown = setInterval(() => {
      secondsLeft = secondsLeft - 0.1;
      const decimalPlaces = secondsLeft < 10 ? 1 : 0;
      const counters = getElementsAsArray('seconds');
      counters.map(counter => counter.textContent = secondsLeft.toFixed(decimalPlaces));
    }, 100);
  }
  
  const counters = getElementsAsArray('seconds');
  const textContent = reserveTimeById[activePlayerId] < 0.2 ? "Game over." : "Done!";
  counters.map(counter => counter.textContent = textContent);

  while (reserveTimeById[activePlayerId] > 0.2) {
    reserveCountdown = setInterval(() => {
      reserveTimeById[activePlayerId] = reserveTimeById[activePlayerId] - 0.1;
      const decimalPlaces = reserveTimeById[activePlayerId] < 10 ? 1 : 0;

      const reserveTimer = getElementsByClassName(`reserve-timer player-${activePlayerId}`)
      reserveTimer.textContent = reserveTimeById[activePlayerId].toFixed(decimalPlaces);
    }, 100);
  }


  // TODO: figure out clear interval
}

function togglePause(playerId) {
  activePlayerId = playerId;
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
    clearInterval(reserveCountdown);
  }
}

function start(playerId) {
  activePlayerId = playerId;
  paused = false;
  const indicators = getElementsAsArray('status-indicator');
  indicators.map(i => i.style.display = 'none');
  if (secondsLeft < TURN_DURATION) {
    clearInterval(countdown);
    clearInterval(reserveCountdown);
    secondsLeft = TURN_DURATION;
    const buttons = getElementsAsArray('pause-play');
    buttons.map(b => b.textContent = PAUSE_TEXT);
  }
  resumeTimer();
}
