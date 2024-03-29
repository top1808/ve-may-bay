import { getAccessToken } from '@/api/api';
import OneWayFlight from '@/features/Flights/components/OneWayFlight';
import React from 'react';
async function getFlight(body: SearchFlightInfo) {
	const getToken = await getAccessToken();

	const res = await fetch(
		`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${body.from}&destinationLocationCode=${body.to}&departureDate=${body.dateDeparture}&adults=${
			body.numberpeople || 1
		}&nonStop=false&max=10`,
		{
			headers: {
				Authorization: 'Bearer ' + getToken?.access_token,
			},
		},
	);
	return res.json();
}
const ChoiceFlightChange = async ({ params, searchParams }: { params: null; searchParams: SearchFlightInfo }) => {
	const res = await getFlight(searchParams);
	const dataDisplay = res?.data;
	return (
		<div>
			<OneWayFlight
				flights={dataDisplay}
				isArrival={false}
				isReturn={false}
				isChange={true}
			/>
		</div>
	);
};

export default ChoiceFlightChange;
