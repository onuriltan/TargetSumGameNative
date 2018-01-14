import * as types from './actionTypes';

export function startGame(state) {
    return {
        type: types.START_GAME,
        payload: state
    };
}

export function resetGame(state) {
    return {
        type: types.RESET_GAME,
        payload: state
    };

}

export function gameOver(state) {
    return {
        type: types.GAME_OVER,
        payload: state
    }
}

export function numberClick(state) {
    return { 
        type: types.NUMBER_CLICK, 
        payload: state
    };

}

export function startCountDown(state) {
    return {
        type: types.START_COUNTDOWN,
        payload: state
    }
}
