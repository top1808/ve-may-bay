'use client';
import { convertStringToDayTime, customMoney, getAirlineName, getLocationName } from '@/utils/functionHelper';
import { Table, TableProps } from 'antd';
import React from 'react';
interface DataType {
	key: string;
	code: string;
	carrierCode: string;
	nameCustomer: string;
	emailCustomer: string;
	from: string;
	to: string;
	price: string;
	dateDeparture: string;
}
const ManagementComponent = ({ data }: { data: any }) => {
	const dataSource: DataType[] = [
		{
			key: '1',
			carrierCode: 'VJ',
			code: 'sadad',
			dateDeparture: '2024-04-21T16:45:00',
			emailCustomer: 'thang@gmail.com',
			from: 'SGN',
			nameCustomer: 'thang',
			price: '22',
			to: 'DAD',
		},
	];

	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'Code',
			dataIndex: 'code',
			key: 'code',
		},
		{
			title: 'Airline Name',
			dataIndex: 'carrierCode',
			key: 'carrierCode',
			render: (text) => <p>{getAirlineName(text)?.name}</p>,
		},
		{
			title: 'Customer Name',
			dataIndex: 'nameCustomer',
			key: 'nameCustomer',
		},
		{
			title: 'Customer email',
			dataIndex: 'emailCustomer',
			key: 'emailCustomer',
		},
		{
			title: 'Departure place',
			dataIndex: 'from',
			key: 'from',
			render: (text) => <p>{getLocationName(text)}</p>,
		},
		{
			title: 'Arrival place',
			dataIndex: 'to',
			key: 'to',
			render: (text) => <p>{getLocationName(text)}</p>,
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (text) => <p>{customMoney(text)}</p>,
		},
		{
			title: 'Departure time',
			dataIndex: 'dateDeparture',
			key: 'dateDeparture',
			render: (text) => <p>{convertStringToDayTime(text)}</p>,
		},
	];

	return (
		<div className='p-2'>
			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={{ pageSize: 10 }}
			/>
		</div>
	);
};

export default ManagementComponent;
