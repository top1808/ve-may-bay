'use client';
import { Col, Row } from 'antd';
import Image from 'next/image';
import React from 'react';
import ItemFlight from './ItemFlight';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { setDataPaying, setDataPayingFlightArrival, setDataPayingFlightDeparture } from '@/redux/reducers/flightReducer';
import Swal from 'sweetalert2';

const OneWayFlight = ({ flights, isReturn, isArrival, isChange }: { flights: ItemFlight[]; isReturn: boolean; isArrival: boolean; isChange?: boolean }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const { orderChanging } = useAppSelector((state) => state.flight);

	const handleChoice = async (item: ItemFlight) => {
		if (isChange) {
			const body = {
				...orderChanging,
				airlineCode: item.itineraries?.[0]?.segments?.[0]?.aircraft?.code,
				dateDeparture: item.itineraries?.[0]?.segments?.[0]?.departure?.at,
				dateArrival: item.itineraries?.[0]?.segments?.[0]?.arrival?.at,
				from: item.itineraries?.[0]?.segments?.[0]?.departure?.iataCode,
				to: item.itineraries?.[0]?.segments?.[0]?.arrival?.iataCode,
				price: item.price?.total,
				carrierCode: item.itineraries?.[0]?.segments?.[0]?.carrierCode,
			};
			const res = await fetch('/api/change-ticket', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			if (res.ok) {
				Swal.fire({
					title: 'Đổi vé thành công',
					icon: 'success',
				}).then((res) => {
					if (res.isConfirmed) {
						router.push('/');
					}
				});
			}

			// xu ly doi ve !
		} else {
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
					<Row className='py-2 mt-4 '>
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
