import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FlightState {
	isLoading: boolean;
	data?: any[];
}

const initialState: FlightState = {
	isLoading: true,
	data: [],
};

const flightSlice = createSlice({
	name: 'flight',
	initialState: initialState,
	reducers: {
		setFlightData: (state: FlightState, action: PayloadAction<any[]>) => {
			state.data = action.payload;
		},
	},
});

export const { setFlightData } = flightSlice.actions;
export const FlightState = (state: RootState) => state.flight;
export default flightSlice.reducer;
