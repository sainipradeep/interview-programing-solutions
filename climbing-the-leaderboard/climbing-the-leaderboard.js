'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString.replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {
  let ranks = []
  let rank = 1;
  for (let i = 0; i < scores.length; i++) {
    if (i > 0 && scores[i] != scores[i - 1]) {
      rank++;
    }
    ranks[i] = rank;
  }

  let result = []
  alice.forEach((score) => {
    let lower = 0;
    let upper = scores.length - 1;
    let current_rank = 1;
    while (lower <= upper) {
      let middle = Math.floor((lower + upper) / 2);
      if (score == scores[middle]) {
        current_rank = ranks[middle];
        break;
      } else if (score < scores[middle]) {
        current_rank = ranks[middle] + 1;
        lower = middle + 1;
      } else {
        upper = middle - 1;
      }
    }
    result.push(current_rank)
  })

  return result

}



function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const scoresCount = parseInt(readLine(), 10);

  const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

  const aliceCount = parseInt(readLine(), 10);

  const alice = readLine().split(' ').map(aliceTemp => parseInt(aliceTemp, 10));

  let result = climbingLeaderboard(scores, alice);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
