import { logDOM } from '@testing-library/react';
import {SELECT_POST} from '../types';
import {SELECT_COMMENT} from '../types';
import {SELECT_ANSWER} from '../types';

const initialState = {
    post: {},
    comment:{},
    answer:{}
};

const LobbyDataReducer = (state = initialState, action) => {
    switch(action.type){
        case SELECT_POST :
            return {...state, post: action.payload};

            case SELECT_COMMENT :
            return {...state, comment: action.payload};

            case SELECT_ANSWER :
            return {...state, answer: action.payload};
        default :
            return state
    }
}

export default LobbyDataReducer;