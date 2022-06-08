
import {combineReducers} from 'redux';

import passport from './loginData-reducer';
import lobby from './lobbyData-reducer';

const rootReducer = combineReducers({
    passport,
    lobby
});

export default rootReducer;