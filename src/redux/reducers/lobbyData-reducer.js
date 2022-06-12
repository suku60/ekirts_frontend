import {LOBBYJOIN, LOBBYWATCH} from '../types';

const initialState = {
    joinLobbyData: {},
    watchLobbyData: []
};

const lobbyDataReducer = (state = initialState, action) => {
    switch(action.type){
        case LOBBYJOIN :
            return {...state, lobbydata: action.payload};

        case LOBBYWATCH :
            return {...state, watchLobbyData: action.payload};

        default :
            return state
    }
}

export default lobbyDataReducer;