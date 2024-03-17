import axios from 'axios';

const accessToken = "9WHvUelG9fPGXF4W2IdGLWcvJhdg"

export const api = {
	searchFlight(body: SearchFlightInfo) {
		return axios.get(
			`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${body.from}&destinationLocationCode=${body.to}&departureDate=${body.dateDeparture}&adults=${
				body.numberpeople || 1
			}&nonStop=false&max=250`,
            {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            }
		);
	},
};
