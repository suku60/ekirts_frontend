
import {combineReducers} from 'redux';

import passport from './loginData-reducer';
import lobby from './lobbyData-reducer';
import userOptions from './userOptionsData-reducer';

const rootReducer = combineReducers({
    passport,
    lobby,
    userOptions,
});

export default rootReducer;