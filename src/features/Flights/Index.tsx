'use client';
import React, { useEffect, useState } from 'react';
import OneWayFlight from './components/OneWayFlight';
import ReturnFlights from './components/ReturnFlights';

type FlightPageProps = {
	flights: ItemFlight[];
	isReturn: boolean;
	flightsArrival?: ItemFlight[];
};

const FlightPage = ({ flights, isReturn, flightsArrival }: FlightPageProps) => {
	return (
		<>
			{isReturn ? (
				<ReturnFlights
					flights={flights}
					flightsReturn={flightsArrival}
				/>
			) : (
				<OneWayFlight
					isReturn={false}
					isArrival={false}
					flights={flights}
				/>
			)}
		</>
	);
};

export default FlightPage;
