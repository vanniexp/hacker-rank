"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function timeConversion(s) {
  var hours = parseInt(s.substring(0, s.indexOf(':')));
  var minutes = parseInt(s.substring(s.indexOf(':') + 1, s.lastIndexOf(':')));
  var seconds = parseInt(s.substring(s.lastIndexOf(':') + 1, s.lastIndexOf(':') + 3));

  var militaryHours;

  if (hours === 12) {
      militaryHours = 0;
  } else {
      militaryHours = hours;
  }

  var hourShift; // Adds 12 hours for all input string containing PM
  if(s.toLowerCase().indexOf('pm') > -1) {
      hourShift = 12;
  } else {
      hourShift = 0;
  }

  function addZeroFormat(numString) {
      if (numString.length === 1) {
          return "0" + numString;
      }
      return numString;
  }

  var formattedHours = addZeroFormat((militaryHours + hourShift).toString());
  var formattedMinutes = addZeroFormat(minutes.toString());
  var formattedSeconds = addZeroFormat(seconds.toString());

  return (formattedHours + ":" + formattedMinutes + ":" + formattedSeconds);

}


function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  const result = timeConversion(s);

  ws.write(result + "\n");

  ws.end();
}
