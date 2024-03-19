import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FlightState {
	isLoading: boolean;
	data?: ItemFlight[];
	dataPaying?: ItemFlight[];
	dataSearch?: SearchFlightInfo;
	flightDeparture?: ItemFlight;
	flightArrival?: ItemFlight;
	orderChanging?: Order;
}

const initialState: FlightState = {
	isLoading: false,
	data: [],
};

const flightSlice = createSlice({
	name: 'flight',
	initialState: initialState,
	reducers: {
		setFlightData: (state: FlightState, action: PayloadAction<any[]>) => {
			state.data = action.payload;
			state.isLoading = false;
		},
		setDataPaying: (state: FlightState, action: PayloadAction<ItemFlight[] | undefined>) => {
			state.dataPaying = action.payload;
		},
		setLoading: (state: FlightState, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setDataPayingFlightDeparture: (state: FlightState, action: PayloadAction<ItemFlight>) => {
			state.dataPaying = [action.payload];
		},
		setDataPayingFlightArrival: (state: FlightState, action: PayloadAction<ItemFlight>) => {
			var temp = state.dataPaying;
			state.dataPaying = [temp![0], action.payload];
		},
		setOrderChanging: (state: FlightState, action: PayloadAction<Order | undefined>) => {
			state.orderChanging = action.payload;
		},
	},
});

export const { setFlightData, setDataPaying, setLoading, setDataPayingFlightArrival, setDataPayingFlightDeparture, setOrderChanging } = flightSlice.actions;
export const FlightState = (state: RootState) => state.flight;
export default flightSlice.reducer;
