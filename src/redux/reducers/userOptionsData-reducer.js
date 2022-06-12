import {ANIMATIONSLOG} from '../types';

const initialState = {
    animations: true
};

const userOptionsReducer = (state = initialState, action) => {
    switch(action.type){
        case ANIMATIONSLOG :
            return {...state, animations: action.payload};

        default :
            return state
    }
}

export default userOptionsReducer;