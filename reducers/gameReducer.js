import * as TYPES from '../actions/actionTypes';
import initialState from './initialState.js';

export default function gameReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case TYPES.START_GAME:
            newState = action.payload;    
            return {...state, newState};

        case TYPES.RESET_GAME:
            newState = action.payload;
            return {...state, newState};

        case TYPES.NUMBER_CLICK:
            newState = action.payload;
            return {...state, newState};

        case TYPES.START_COUNTDOWN:
            newState = action.payload;
            return {...state, newState};
        
        case TYPES.GAME_OVER:
            newState = action.payload;
            return {...state, newState};

        default:
            return state;
    }

}
