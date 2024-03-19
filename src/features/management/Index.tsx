'use client';
import { convertStringToDayTime, customMoney, getAirlineName, getLocationName } from '@/utils/functionHelper';
import { Table, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
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
	const [dataSource, setDataSource] = useState([]);

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
			title: 'Departure date',
			dataIndex: 'dateDeparture',
			key: 'dateDeparture',
			render: (text) => <p>{convertStringToDayTime(text)}</p>,
		},
		{
			title: 'Arrival date',
			dataIndex: 'dateArrival',
			key: 'dateArrival',
			render: (text) => <p>{convertStringToDayTime(text)}</p>,
		},
	];

	useEffect(() => {
		const getAllTickets = async () => {
			const res = await fetch('/api/admin');
			const data = await res.json();
			setDataSource(data);
		};
		getAllTickets();
	}, []);

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
