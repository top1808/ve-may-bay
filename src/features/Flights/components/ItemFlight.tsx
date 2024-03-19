import { convertStringToDayTime, customMoney, getAirlineName } from '@/utils/functionHelper';
import { Button, Col, Row } from 'antd';
import Image from 'next/image';
import React from 'react';

const ItemFlight = ({ data, handleOnclick }: { data: ItemFlight; handleOnclick: (item: ItemFlight) => void }) => {
	return (
		<Row className='w-full  p-8 rounded border border-solid border-gray-300 shadow mt-4 bg-white'>
			<Col span={4}>
				<div>{convertStringToDayTime(data.itineraries?.[0]?.segments?.[0]?.departure?.at as string)}</div>
			</Col>
			<Col span={4}>{convertStringToDayTime(data.itineraries?.[0]?.segments?.[0]?.arrival?.at as string)}</Col>

			<Col span={8}>
				<p>{customMoney(Number(data.price?.total)) + ''}</p>
			</Col>
			<Col span={4}>
				<p>{getAirlineName(data.itineraries?.[0].segments?.[0]?.carrierCode!)?.name}</p>
				<Image
					height={50}
					quality={100}
					width={50}
					src={getAirlineName(data.itineraries?.[0].segments?.[0]?.carrierCode!)?.icon || '/images/logo_vna.webp'}
					alt={getAirlineName(data.itineraries?.[0].segments?.[0]?.carrierCode!)?.name || 'default'}
				/>
			</Col>
			<Col span={4}>
				<Button
					type='primary'
					onClick={() => handleOnclick(data)}
				>
					{'Đặt vé'}
				</Button>
			</Col>
		</Row>
	);
};

export default ItemFlight;
