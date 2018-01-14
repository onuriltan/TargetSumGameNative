export default function resetGame(initialState){

    initialState.startButtonDisabled = false;
    initialState.numberButtonDisabled = true;
    initialState.resetButtonDisabled = true
    initialState.challengeSize = 6;
    initialState.initialChallengeRange = [20, 30];
    initialState.initialSeconds = 120;
    initialState.numbers = [0, 0, 0, 0, 0, 0];
    initialState.targetNumber = 0;
    initialState.timesToReachTarget = 0;
    initialState.timesOfPlay = 0;
    initialState.gameState = 'NOT_STARTED';
    initialState.initialSum = 0;

    return initialState;
}