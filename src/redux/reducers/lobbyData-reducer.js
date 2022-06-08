import {LOBBYLOG, SEARCHLOG} from '../types';

const initialState = {
    lobbydata: {},
    search_lobby: []
};

const lobbyDataReducer = (state = initialState, action) => {
    switch(action.type){
        case LOBBYLOG :
            return {...state, lobbydata: action.payload};

        case SEARCHLOG :
            return {...state, search_lobby: action.payload};

        default :
            return state
    }
}

export default lobbyDataReducer;