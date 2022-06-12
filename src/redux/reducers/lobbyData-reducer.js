import {LOBBYLOG, ISUSERJOININGLOBBY} from '../types';

const initialState = {
    lobbyData: {},
    isUserJoining: {}
};

const lobbyDataReducer = (state = initialState, action) => {
    switch(action.type){
        case LOBBYLOG :
            return {...state, lobbyData: action.payload};

        case ISUSERJOININGLOBBY :
            return {...state, isUserJoining: action.payload};

        default :
            return state
    }
}

export default lobbyDataReducer;