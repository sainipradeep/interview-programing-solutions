'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', function() {
  inputString = inputString.replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the minimumSwaps function below.
function minimumSwaps(arr) {
  let old_arr = [].concat(arr);
  let count = 0;
  arr.sort(function(a, b) {
    return a - b;
  });


  var old_arr_obj = {};

  for (var i = 0; i < old_arr.length; i++) {
    old_arr_obj[old_arr[i]] = i;
  }
  // [1,2,3,4]
  //[4,3,1,2]
  for (var i = 0; i < arr.length; i++) {

    let old_arr_index = old_arr_obj[arr[i]]; //false position 2

    if (old_arr_index != i) {

      old_arr_obj[arr[i]] = i;
      old_arr_obj[old_arr[i]] = old_arr_index;

      let temp = old_arr[i];
      old_arr[i] = old_arr[old_arr_index];
      old_arr[old_arr_index] = temp;

      ++count;

    }
  }

  return count

}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine(), 10);

  const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

  const res = minimumSwaps(arr);

  ws.write(res + '\n');

  ws.end();
}
