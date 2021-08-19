'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'queensAttack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER r_q
 *  4. INTEGER c_q
 *  5. 2D_INTEGER_ARRAY obstacles
 */

function queensAttack(tableSize, obstacles, queenRow, queenColumn, obstaclesArray) {

    let maxEast = tableSize - queenColumn;
    let maxNorth = tableSize - queenRow;

    let maxWest = queenColumn - 1;
    let maxSouth = queenRow - 1;

    let maxNorthWest = Math.min(maxNorth, maxWest);
    let maxNorthEast = Math.min(maxNorth, maxEast);

    let maxSouthWest = Math.min(maxSouth, maxWest);
    let maxSouthEast = Math.min(maxSouth, maxEast);

    obstaclesArray.forEach((obstacle) => {
        const obstacleRow = obstacle[0];
        const obstacleColumn = obstacle[1];
        const distanceRow = Math.abs(queenColumn - obstacleColumn);
        const distanceColumn = Math.abs(queenRow - obstacleRow);
        
        if (queenRow === obstacleRow) {
            if (queenColumn < obstacleColumn) {
                if (maxEast > distanceRow) {
                    maxEast = distanceRow;
                }
            } else if (maxWest > distanceRow) {
                maxWest = distanceRow;
            }
        } else if (queenColumn === obstacleColumn) {
            if (queenRow < obstacleRow) {
                if (maxNorth > distanceColumn) {
                    maxNorth = distanceColumn;
                }
            } else if (maxSouth > distanceColumn) {
                maxSouth = distanceColumn;
            }
        } else if (distanceColumn === distanceRow){
            if(queenRow > obstacleRow && queenColumn > obstacleColumn){
                
            }else if(queenRow < obstacleRow && queenColumn < obstacleColumn){
                
            }else if(queenRow > obstacleRow && queenColumn < obstacleColumn){
                
            }else{
                
            }
        }
    });

    return maxEast + maxNorth + maxWest + maxSouth + maxNorthWest + maxNorthEast + maxSouthWest + maxSouthEast;
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const secondMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const r_q = parseInt(secondMultipleInput[0], 10);

    const c_q = parseInt(secondMultipleInput[1], 10);

    let obstacles = Array(k);

    for (let i = 0; i < k; i++) {
        obstacles[i] = readLine().replace(/\s+$/g, '').split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));
    }

    const result = queensAttack(n, k, r_q, c_q, obstacles);

    ws.write(result + '\n');

    ws.end();
}
