"use client"
import { useAppSelector } from '@/redux/hooks';
import { FlightState } from '@/redux/reducers/flightReducer';
import React from 'react';

type FlightPageProps = {};

const FlightPage = (props: FlightPageProps) => {
	const flight = useAppSelector(FlightState);
	console.log('🚀 ~ FlightPage ~ flight:', flight);
	return <div>FlightPage</div>;
};

export default FlightPage;
