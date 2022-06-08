import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import { save, load } from "redux-localstorage-simple";
import reducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(
    save({ states: ['passport', 'LobbyData'] })
)(configureStore);

const store = createStoreWithMiddleware(
    reducer,
    load({ states: ['passport', 'LobbyData'] }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true,
    })
);

export default store;