"use strict";
const $ = selector => document.querySelector(selector);

const padSingleDigit = num => num.toString().padStart(2, "0");

const displayCurrentTime = () => {
    var now = new Date();
  var hours = now.getHours();
  var ampm = 'AM'; // set default value

  // correct hours and AM/PM value for display
  if (hours > 12) {
    // convert from military time
    hours = hours - 12;
    ampm = 'PM';
  } else {
    // adjust 12 noon and 12 midnight
    switch (hours) {
      case 12: // noon
        ampm = 'PM';
        break;
      case 0: // midnight
        hours = 12;
        ampm = 'AM';
    }
  }

  $('#hours').firstChild.nodeValue = hours;
  $('#minutes').firstChild.nodeValue = padSingleDigit(now.getMinutes());
  $('#seconds').firstChild.nodeValue = padSingleDigit(now.getSeconds());
  $('#ampm').firstChild.nodeValue = ampm;
};


//global stop watch timer variable and elapsed time object
let stopwatchTimer;
let elapsedMinutes = 0;
let elapsedSeconds = 0;
let elapsedMilliseconds = 0;

const tickStopwatch = () => {    
    // increment milliseconds by 10 milliseconds
    elapsedMilliseconds += 10;
    // if milliseconds total 1000, increment seconds by one and reset milliseconds to zero
    if (elapsedMilliseconds == 1000) {
        elapsedSeconds += 1;
        elapsedMilliseconds = 0;
      }
    // if seconds total 60, increment minutes by one and reset seconds to zero
    if (elapsedSeconds == 60) {
        elapsedMinutes += 1;
        elapsedSeconds = 0;
      }
    //display new stopwatch time
    $('#s_minutes').firstChild.nodeValue = padSingleDigit(elapsedMinutes);
    $('#s_seconds').firstChild.nodeValue = padSingleDigit(elapsedSeconds);
    $('#s_ms').firstChild.nodeValue = padSingleDigit(elapsedMilliseconds);
};

// event handler functions
const startStopwatch = evt => {
    // prevent default action of link
    evt.preventDefault();
    // do first tick of stop watch and then set interval timer to tick 
    // stop watch every 10 milliseconds. Store timer object in stopwatchTimer 
    // variable so next two functions can stop timer.
    stopwatchTimer = setInterval(tickStopwatch, 10);
};

const stopStopwatch = evt => {
    // prevent default action of link
    evt.preventDefault();
    // stop timer
    clearInterval(stopwatchTimer);
};

const resetStopwatch = evt => {
    // prevent default action of link
    evt.preventDefault();
    // stop timer
    clearInterval(stopwatchTimer);
    // reset elapsed variables and clear stopwatch display
    elapsedMinutes = 0;
    elapsedSeconds = 0;
    elapsedMilliseconds = 0;

    $('#s_minutes').firstChild.nodeValue = padSingleDigit(elapsedMinutes);
    $('#s_seconds').firstChild.nodeValue = padSingleDigit(elapsedSeconds);
    $('#s_ms').firstChild.nodeValue = padSingleDigit(elapsedMilliseconds);
};

document.addEventListener("DOMContentLoaded", () => {
	// set initial clock display and then set interval timer to display
    // new time every second. Don't store timer object because it 
    // won't be needed - clock will just run.
    displayCurrentTime();
    setInterval(displayCurrentTime, 1000);
	
	// set up stopwatch event handlers
    $('#start').addEventListener('click', startStopwatch);
  $('#stop').addEventListener('click', stopStopwatch);
  $('#reset').addEventListener('click', resetStopwatch);
});
