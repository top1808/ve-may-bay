import { combineReducers } from '@reduxjs/toolkit';
import flightReducer from './reducers/flightReducer';

const rootReducer = combineReducers({
	flight: flightReducer,
});

export default rootReducer;
