const TURN_DURATION = 60;
const RESERVE_TIME = 30;

const PAUSE_TEXT = "Pause";
const PLAY_TEXT = "Resume play";

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

console.log(activePlayerId);

// converts htmlCollection -> Array
function getElementsAsArray(className) {
  let elements = document.getElementsByClassName(className);
  return Array.from(elements);
}

function resumeReserveTimer() {
    reserveCountdown = setInterval(() => {
      if (reserveTimeById[activePlayerId] < 0.1) {
        const inactivePlayerId = activePlayerId === 1 ? 2 : 1;
        
        clearInterval(reserveCountdown);
        const reserveTimer = getElementsAsArray(`reserve-timer player-${activePlayerId}`)
        reserveTimer[0].textContent = "0.0";

        const activeSecondsTextElement = getElementsAsArray(`seconds player-${activePlayerId}`)
        const inactiveSecondsTextElement = getElementsAsArray(`seconds player-${inactivePlayerId}`)
        activeSecondsTextElement[0].textContent = "LOSE";
        inactiveSecondsTextElement[0].textContent = "WIN";
        
        clearInterval(reserveCountdown);
      }
      
      // console.log(`player ${activePlayerId} reserve time: ${reserveTimeById[activePlayerId]}`);
      reserveTimeById[activePlayerId] = Math.abs(reserveTimeById[activePlayerId] - 0.1);
      const reserveTimer = getElementsAsArray(`reserve-timer player-${activePlayerId}`)
      console.log(`reserveTimerId: ${reserveTimer}`);
      reserveTimer[0].textContent = reserveTimeById[activePlayerId].toFixed(1);
    }, 100);
}


function resumeTimer() {
  countdown = setInterval(() => {
    if (secondsLeft < 0.2) {
      clearInterval(countdown);
      const counters = getElementsAsArray('seconds');
      counters.map(counter => counter.textContent = 'Done!');
      resumeReserveTimer();
      return;
    }

    secondsLeft = secondsLeft - 0.1;
    const decimalPlaces = secondsLeft < 10 ? 1 : 0;
    const counters = getElementsAsArray('seconds');
    counters.map(counter => counter.textContent = secondsLeft.toFixed(decimalPlaces));
  }, 100);
  
  

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
