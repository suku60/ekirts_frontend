import {LOGIN, LOGOUT} from '../types';

const initialState = {
    token : '',
    user : {}
};

const loginDataReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN :
            return action.payload;

        case LOGOUT : 
            return initialState;

        default :
            return state
    }
}

export default loginDataReducer;