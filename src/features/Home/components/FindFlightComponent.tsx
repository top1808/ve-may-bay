'use client';
import { airports } from '@/constant/locationCode';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setDataPaying } from '@/redux/reducers/flightReducer';
import { objectToQueryString } from '@/utils/functionHelper';
import { Button, Col, DatePicker, Form, Radio, Row, Select, Spin } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

export interface FindFlightData {
	from?: string | null;
	to?: string | null;
	date?: Date[] | Date;
	typeFlight?: string;
}

const { RangePicker } = DatePicker;

type FindFlightComponentProps = {};

const FindFlightComponent = (props: FindFlightComponentProps) => {
	const [form] = Form.useForm<FindFlightData>();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const typeFlight = Form.useWatch('typeFlight', form);

	const onSubmit = async (data: FindFlightData) => {
		if (data.from === data.to) {
			Swal.fire({
				title: 'Error!',
				text: 'Nơi đi giống nơi đến',
				icon: 'error',
				confirmButtonText: 'Tắt',
			});
			return;
		}
		const body: SearchFlightInfo = {
			from: data.from || '',
			to: data.to || '',
			dateDeparture: data.typeFlight === 'mot_chieu' ? dayjs(data.date as Date).format('YYYY-MM-DD') : dayjs((data?.date as Date[])?.[0]).format('YYYY-MM-DD'),
			dateReturn: dayjs((data?.date as Date[])?.[1]).format('YYYY-MM-DD'),
			typeFlight: data.typeFlight,
		};
		if (body.typeFlight === 'mot_chieu') delete body.dateReturn
		dispatch(setDataPaying(undefined));
		router.push('/flights' + objectToQueryString(body));
	};
	useEffect(() => {
		form.setFieldsValue({
			date: undefined,
			from: null,
			to: null,
			typeFlight: 'khu_hoi',
		});
	}, [form]);

	return (
		<>
			<div className='bg-white rounded p-4 font-semibold shadow-md'>
				<Form
					form={form}
					layout='vertical'
					onFinish={onSubmit}
				>
					<Row>
						<Col xs={24}>
							<Form.Item name='typeFlight'>
								<Radio.Group>
									<Radio value='khu_hoi'>Khứ hồi</Radio>
									<Radio value='mot_chieu'>Một chiều</Radio>
								</Radio.Group>
							</Form.Item>
						</Col>
						<Col xs={24}>
							<Form.Item
								name='from'
								label={<p>Điểm khởi hành</p>}
								rules={[{ required: true, message: 'Bạn chưa chọn điểm khởi hành' }]}
							>
								<Select
									placeholder='Chọn điểm khởi hành'
									showSearch
									className='w-full'
									size='large'
									filterOption={(input, option) => (option?.label || '')?.toString()?.toLowerCase()?.includes(input?.toLowerCase())}
									options={airports?.map((code) => ({ value: code.IATACode, label: code.IATACode + ' - ' + code.location }))}
								/>
							</Form.Item>
						</Col>
						<Col xs={24}>
							<Form.Item
								name='to'
								label={<p>Điểm Đến</p>}
								rules={[{ required: true, message: 'Bạn chưa chọn điểm đến' }]}
							>
								<Select
									placeholder='Chọn điểm đến'
									size='large'
									filterOption={(input, option) => (option?.label || '')?.toString()?.toLowerCase()?.includes(input?.toLowerCase())}
									showSearch
									className='w-full'
									options={airports?.map((code) => ({ value: code.IATACode, label: code.IATACode + ' - ' + code.location }))}
								/>
							</Form.Item>
						</Col>
						<Col xs={24}>
							{typeFlight === 'khu_hoi' ? (
								<Form.Item
									name='date'
									label={<p>Chọn Ngày Xuất Phát - Ngày Trở Về</p>}
									rules={[{ required: true, message: 'Bạn chưa chọn ngày' }]}
								>
									<RangePicker
										className='w-full'
										size='large'
										placeholder={['Chọn ngày xuất phát', 'Chọn ngày trở về']}
										disabledDate={(current) => {
											return dayjs().add(-1, 'days') >= current;
										}}
									/>
								</Form.Item>
							) : (
								<Form.Item
									name='date'
									label={<p>Chọn Ngày Xuất Phát</p>}
									rules={[{ required: true, message: 'Bạn chưa chọn ngày' }]}
								>
									<DatePicker
										className='w-full'
										size='large'
										placeholder='Chọn ngày xuất phát'
										disabledDate={(current) => {
											return dayjs().add(-1, 'days') >= current;
										}}
									/>
								</Form.Item>
							)}
						</Col>
						<Col
							xs={24}
							className='text-center'
						>
							<Form.Item>
								<Button
									shape='round'
									htmlType='submit'
									size='large'
									className='hover:bg-yellow-100 hover:text-black'
									style={{ background: '#FFDE02', border: '1px solid #FFDE02' }}
								>
									Tìm chuyến bay
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</div>
		</>
	);
};

export default FindFlightComponent;
