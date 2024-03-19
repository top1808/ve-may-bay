import { getAccessToken } from '@/api/api';
import FlightPage from '@/features/Flights/Index';
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
export default async function Flight({ params, searchParams }: { params: null; searchParams: SearchFlightInfo }) {
	const res = await getFlight(searchParams);
	const resReturn = searchParams.dateReturn ? await getFlight({ dateDeparture: searchParams.dateReturn, from: searchParams.to, to: searchParams.from }) : null;
	const flightsReturn = resReturn?.data ? resReturn?.data : [];
	
	return (
		<FlightPage
			isReturn={searchParams.typeFlight === 'mot_chieu' ? false : true}
			flights={res.data as ItemFlight[]}
			flightsArrival={flightsReturn}
		/>
	);
}
