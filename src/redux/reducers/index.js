import {combineReducers} from 'redux';

import passport from './loginData-reducer';
import profileData from './profileData-reducer';

const rootReducer = combineReducers({

    passport,
    profileData

});

export default rootReducer;