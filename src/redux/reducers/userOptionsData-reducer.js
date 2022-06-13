import {ANIMATIONSLOG, VIEWLOG} from '../types';

const initialState = {
    animations: true,
    isUserInLobby: false,
};

const userOptionsReducer = (state = initialState, action) => {
    switch(action.type){
        case ANIMATIONSLOG :
            return {...state, animations: action.payload};

        case VIEWLOG :
            return {...state, isUserInLobby: action.payload};
    

        default :
            return state
    }
}

export default userOptionsReducer;