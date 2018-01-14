import _ from 'lodash';

export default function startGame(initialState, timesOfPlay) {
  
  initialState.gameState = 'STARTED';
  initialState.timesOfPlay = timesOfPlay;
  initialState.initialSum = 0;
  initialState.startButtonDisabled = true;
  initialState.numberButtonDisabled = false;
  initialState.resetButtonDisabled = false;

  let targetNumber = _.random(initialState.initialChallengeRange[0] * (timesOfPlay + 1), initialState.initialChallengeRange[1] * (timesOfPlay + 1));
  initialState.targetNumber = targetNumber;
  let timesToReachTarget = _.random(2, 5);
  initialState.timesToReachTarget = timesToReachTarget;

  let tempTargetNumber = targetNumber;
  let generalSum = 0;
  let tempNumbers = [];
  for (let i = 0; i < timesToReachTarget - 1; i++) {
    let number = _.random(timesToReachTarget - i + 1, parseInt(tempTargetNumber / timesToReachTarget - i, 10));
    generalSum += number;
    tempNumbers.push(number);
    tempTargetNumber = targetNumber - number;
  }
  let lastNumber = targetNumber - generalSum;
  generalSum += lastNumber;
  tempNumbers.push(lastNumber);

  for (let j = 0; j < 6 - timesToReachTarget; j++) {
    let number = _.random(0, tempTargetNumber);
    tempNumbers.push(number);
  }
  initialState.numbers = shuffleNumbers(tempNumbers);
  return initialState;

}


export function shuffleNumbers(numbers) {

  let ctr = numbers.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = numbers[ctr];
    numbers[ctr] = numbers[index];
    numbers[index] = temp;
  }
  return numbers;

}