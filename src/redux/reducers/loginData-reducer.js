import { LOGIN, LOGOUT, UPDATE_passport } from '../types';

const initialState = {
    token: '',
    user: {}
};

const reducerLoginData = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload;

        case LOGOUT:
            return initialState;

        case UPDATE_passport:
            return {...state, user: action.payload}

        default:
            return state
    }
}

export default reducerLoginData;