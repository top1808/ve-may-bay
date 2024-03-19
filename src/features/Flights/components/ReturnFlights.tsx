'use client';
import { Button, Col, Row, Steps, message, theme } from 'antd';
import React, { useState } from 'react';
import OneWayFlight from './OneWayFlight';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setDataPaying } from '@/redux/reducers/flightReducer';
import { useSearchParams } from 'next/navigation';
import { getLocationName } from '@/utils/functionHelper';

const ReturnFlights = ({ flights, flightsReturn }: { flights: ItemFlight[]; flightsReturn: ItemFlight[] | undefined }) => {
	const { dataPaying } = useAppSelector((state) => state.flight);
	const searchParams = useSearchParams();

	const dispatch = useAppDispatch();
	const steps = [
		{
			title: 'Chọn chuyến đi',
			content: (
				<OneWayFlight
					isReturn={true}
					isArrival={false}
					flights={flights}
				/>
			),
		},
		{
			title: 'Chọn chuyến về',
			content: (
				<>
					<Button
						onClick={() => dispatch(setDataPaying(undefined))}
						type='primary'
					>
						Back
					</Button>
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
			<Row
				className='bg-yellow-500 p-8'
				gutter={[16, 16]}
			>
				<Col span={24}>
					<p className='text-2xl font-bold'>
						CHUYẾN BAY KHỨ HỒI | <span>1 Người lớn</span>{' '}
					</p>
				</Col>
				<Col span={12}>
					<p className='text-xl font-bold'>{`Xuất phát từ: ${getLocationName(searchParams.get('from')!)}`}</p>
					<p className='text-xl font-bold'>{`Ngày: ${searchParams.get('dateDeparture')!}`}</p>
				</Col>
				<Col span={12}>
					<p className='text-xl font-bold'>{`Đến: ${getLocationName(searchParams.get('to')!)}`}</p>
					<p className='text-xl font-bold'>{`Ngày: ${searchParams.get('dateReturn')!}`}</p>
				</Col>
			</Row>
			{dataPaying?.length && dataPaying?.length > 0 && (
				<div>
					<Row className='py-4 bg-white'>
						<Col span={24}>
							<h1 className='text-2xl text-center font-bold'>{steps[1].title}</h1>
						</Col>
					</Row>
					{steps[1].content}
				</div>
			)}
			{!dataPaying && (
				<div>
					<Row className='py-4 bg-white'>
						<Col span={24}>
							<h1 className='text-2xl text-center font-bold'>{steps[0].title}</h1>
						</Col>
					</Row>
					{steps[0].content}
				</div>
			)}
		</div>
	);
};

export default ReturnFlights;
