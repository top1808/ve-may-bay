import { Col, Row } from 'antd';
import Image from 'next/image';
import React from 'react';
import ItemFlight from './ItemFlight';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { setDataPaying, setDataPayingFlightArrival, setDataPayingFlightDeparture } from '@/redux/reducers/flightReducer';

const OneWayFlight = ({ flights, isReturn, isArrival }: { flights: ItemFlight[]; isReturn: boolean; isArrival: boolean }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const handleChoice = (item: ItemFlight) => {
		if (!isReturn) {
			dispatch(setDataPaying([item]));
			router.push('/passengers');
		} else {
			if (isArrival) {
				dispatch(setDataPayingFlightArrival(item));
				router.push('/passengers');
			} else {
				dispatch(setDataPayingFlightDeparture(item));
			}
		}
	};
	return (
		<>
			{!flights ? (
				<div className='p-4'>
					<Row>
						<Col span={24}>
							<p className='text-xl text-center'>Không tìm thấy kết quả phù hợp</p>
						</Col>
					</Row>
					<Row justify={'center'}>
						<Image
							width={200}
							height={200}
							src={'/images/no_results.png'}
							alt={'no results'}
						/>
					</Row>
				</div>
			) : (
				<>
					<Row>
						<Col span={4}>
							<strong className='text-xl'>Departure</strong>
						</Col>
						<Col span={4}>
							<strong className='text-xl'>Arrival</strong>
						</Col>
						<Col span={8}>
							<strong className='text-xl'>Price</strong>
						</Col>
						<Col span={4}>
							<strong className='text-xl'>Airlines</strong>
						</Col>
						<Col span={4}>
							<strong className='text-xl'>Actions</strong>
						</Col>
					</Row>
					{flights!.map((item) => (
						<ItemFlight
							key={item.id}
							data={item}
							handleOnclick={() => handleChoice(item)}
						/>
					))}
				</>
			)}
		</>
	);
};

export default OneWayFlight;
