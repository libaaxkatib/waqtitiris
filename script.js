const timeDisplay = document.getElementById("time-display");
const startStopBtn = document.getElementById("start-stop-btn");
const lapBtn = document.getElementById("lap-btn");
const resetBtn = document.getElementById("reset-btn");
const lapsList = document.getElementById("laps-list");
const lapsHeading = document.getElementById("laps-heading");


// When we last hit "Start". null when paused or reset.
let startTime = null;
// Time accumulated from previous run sessions (before the
// current run started). This is what makes pause/resume work.
let elapsedBeforePause = 0;
// The setInterval handle, so we can cancel it.
let intervalId = null;
// Array of lap times.
let laps = [];

// Returns the total elapsed time in milliseconds.
// Combines time from past runs plus current run (if running).
function getElapsedMs() {
if (startTime === null) {
// Paused or reset — just return the saved total.
return elapsedBeforePause;
}
// Running — saved total + how long since we last hit Start.
return elapsedBeforePause + (Date.now() - startTime);
}
// Format a millisecond value as "MM:SS.cc"

function formatTime(ms) {
const totalSeconds = Math.floor(ms / 1000);
const minutes = Math.floor(totalSeconds / 60);
const seconds = totalSeconds % 60;
const centis = Math.floor((ms % 1000) / 10);
const mm = String(minutes).padStart(2, "0");
const ss = String(seconds).padStart(2, "0");
const cc = String(centis).padStart(2, "0");
return `${mm}:${ss}.${cc}`;
}

function tick() {
timeDisplay.textContent = formatTime(getElapsedMs());
}

timeDisplay.textContent = formatTime(0);

function start() {
startTime = Date.now();
// Update the display roughly every 10ms.
intervalId = setInterval(tick, 10);
// Switch the button to "Stop".
startStopBtn.textContent = "Stop";
startStopBtn.classList.remove("btn--start");
startStopBtn.classList.add("btn--stop");
// Lap is only meaningful while running.
lapBtn.disabled = false;
}
function stop() {
