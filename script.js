// ========================================
// GET HTML ELEMENTS
// ========================================

const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

const status = document.getElementById("status");
const lapList = document.getElementById("lapList");


// ========================================
// STOPWATCH VARIABLES
// ========================================

// Total elapsed time in milliseconds
let elapsedTime = 0;

// Stores the time when the stopwatch starts
let startTime = 0;

// Stores the interval ID
let timer = null;

// Used to check whether stopwatch is running
let isRunning = false;

// Used for numbering laps
let lapNumber = 0;


// ========================================
// FORMAT TIME
// ========================================

function formatTime(time) {

  // Convert milliseconds into total seconds
  const totalSeconds = Math.floor(time / 1000);

  // Calculate hours
  const hours = Math.floor(totalSeconds / 3600);

  // Calculate minutes
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  // Calculate seconds
  const seconds = totalSeconds % 60;

  // Calculate milliseconds
  const milliseconds = Math.floor((time % 1000) / 10);


  // Add leading zeros
  const formattedHours = String(hours).padStart(2, "0");

  const formattedMinutes = String(minutes).padStart(2, "0");

  const formattedSeconds = String(seconds).padStart(2, "0");

  const formattedMilliseconds =
    String(milliseconds).padStart(2, "0");


  // Return final formatted time
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}


// ========================================
// UPDATE DISPLAY
// ========================================

function updateDisplay() {

  display.textContent = formatTime(elapsedTime);
}


// ========================================
// START STOPWATCH
// ========================================

function startStopwatch() {

  // Prevent multiple timers from running
  if (isRunning) {
    return;
  }

  isRunning = true;

  // Save starting time
  startTime = Date.now() - elapsedTime;

  // Change status
  status.textContent = "RUNNING";

  // Update stopwatch frequently
  timer = setInterval(function () {

    // Calculate elapsed time
    elapsedTime = Date.now() - startTime;

    // Update screen
    updateDisplay();

  }, 10);
}


// ========================================
// PAUSE STOPWATCH
// ========================================

function pauseStopwatch() {

  // Do nothing if stopwatch is already stopped
  if (!isRunning) {
    return;
  }

  // Stop the interval
  clearInterval(timer);

  timer = null;

  // Update elapsed time one final time
  elapsedTime = Date.now() - startTime;

  // Update display
  updateDisplay();

  // Change state
  isRunning = false;

  // Change status
  status.textContent = "PAUSED";
}


// ========================================
// RESET STOPWATCH
// ========================================

function resetStopwatch() {

  // Stop the timer
  clearInterval(timer);

  timer = null;

  // Reset all values
  elapsedTime = 0;
  startTime = 0;

  isRunning = false;

  // Reset lap counter
  lapNumber = 0;

  // Reset display
  updateDisplay();

  // Reset status
  status.textContent = "READY";

  // Remove all lap records
  lapList.innerHTML = "";
}


// ========================================
// ADD LAP
// ========================================

function addLap() {

  // Lap only works while stopwatch is running
  if (!isRunning) {
    return;
  }

  lapNumber++;

  // Create a new list item
  const lapItem = document.createElement("li");

  // Add lap information
  lapItem.innerHTML = `
        <span>Lap ${lapNumber}</span>
        <span>${formatTime(elapsedTime)}</span>
    `;

  // Add newest lap at the top
  lapList.prepend(lapItem);
}


// ========================================
// BUTTON EVENTS
// ========================================

startBtn.addEventListener("click", startStopwatch);

pauseBtn.addEventListener("click", pauseStopwatch);

lapBtn.addEventListener("click", addLap);

resetBtn.addEventListener("click", resetStopwatch);


// ========================================
// INITIAL DISPLAY
// ========================================

updateDisplay();