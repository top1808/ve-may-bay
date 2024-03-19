import { convertStringToDayTime, customMoney, getLocationName } from '@/utils/functionHelper';
import { Col, Row } from 'antd';
import React from 'react';

const InforTicket = ({ data }: { data: ItemFlight[] }) => {
	return (
		<Row>
			<Col
				span={24}
				className='bg-red-600 p-4'
			>
				<h1 className='text-xl font-bold  text-white'>Thông tin đặt chỗ</h1>
			</Col>
			<Col
				span={24}
				className=' p-4'
			>
				<p className='text-lg'>Chuyến đi</p>
			</Col>
			{data.map((item, index) => (
				<Col
					key={index}
					span={24}
					className=' p-4 bg-white'
				>
					<p className='text-lg'>
						{getLocationName(item.itineraries?.[0]?.segments?.[0]?.departure?.iataCode!) + ' đến ' + getLocationName(item.itineraries?.[0]?.segments?.[0]?.arrival?.iataCode!)}{' '}
					</p>
					<p className='text-lg'>{'Giá vé: ' + customMoney(Number(item.price?.total))}</p>
					<p className='text-lg'>{'Cất cánh lúc: ' + convertStringToDayTime(item.itineraries?.[0]?.segments?.[0]?.departure?.at as string)}</p>
					<p className='text-lg'>{'Dự kiến đến lúc: ' + convertStringToDayTime(item.itineraries?.[0]?.segments?.[0]?.arrival?.at as string)}</p>
				</Col>
			))}
		</Row>
	);
};

export default InforTicket;
