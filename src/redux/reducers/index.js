import {combineReducers} from 'redux';

import passport from './loginData-reducer';
import LobbyData from './LobbyData-reducer';

const rootReducer = combineReducers({

    passport,
    LobbyData

});

export default rootReducer;