'use client';
import { Button, Steps, message, theme } from 'antd';
import React, { useState } from 'react';
import OneWayFlight from './OneWayFlight';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setDataPaying } from '@/redux/reducers/flightReducer';

const ReturnFlights = ({ flights, flightsReturn }: { flights: ItemFlight[]; flightsReturn: ItemFlight[] | undefined }) => {
	const { dataPaying } = useAppSelector((state) => state.flight);
	const dispatch = useAppDispatch();
	const steps = [
		{
			title: 'Chuyến đi',
			content: (
				<OneWayFlight
					isReturn={true}
					isArrival={false}
					flights={flights}
				/>
			),
		},
		{
			title: 'Chuyến về',
			content: (
				<>
					<Button onClick={() => dispatch(setDataPaying(undefined))}>Back</Button>
					<OneWayFlight
						isReturn={true}
						isArrival={true}
						flights={flightsReturn!}
					/>
				</>
			),
		},
	];
	return (
		<div className='p-10'>
			{dataPaying?.length && dataPaying?.length > 0 && (
				<div>
					<h1 className='text-xl text-center font-bold'>{steps[1].title}</h1>
					{steps[1].content}
				</div>
			)}
			{!dataPaying && (
				<div>
					<h1 className='text-xl text-center font-bold'>{steps[0].title}</h1>
					{steps[0].content}
				</div>
			)}
		</div>
	);
};

export default ReturnFlights;
