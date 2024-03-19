import axios from 'axios';

const accessToken = 'OWTQcBDl6NPZigGyAuimGA8PVPoY';

export const api = {
	searchFlight(body: SearchFlightInfo) {
		return axios.get(
			`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${body.from}&destinationLocationCode=${body.to}&departureDate=${body.dateDeparture}&adults=${
				body.numberpeople || 1
			}&nonStop=false&max=20`,
			{
				headers: {
					Authorization: 'Bearer ' + accessToken,
				},
			},
		);
	},
};
export async function getAccessToken(): Promise<any> {
	const data = new URLSearchParams({
		grant_type: 'client_credentials',
		client_id: 'mbn5SgEMt3wjKVV6LqSAQfV73lcR1fwR',
		client_secret: 'jAhwxAod6dm5Fjdd',
	});

	const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: data.toString(),
	});

	if (!response.ok) {
		throw new Error(`API request failed with status: ${response.status}`);
	}

	return await response.json();
}
