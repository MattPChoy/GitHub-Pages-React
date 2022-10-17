import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const reducer = combineReducers({
    // Add your reducers here
});

const store = configureStore({
    reducer,
});

export default store;