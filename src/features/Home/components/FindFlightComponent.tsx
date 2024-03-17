'use client';
import { api } from '@/api/api';
import { LOCATION_CODE } from '@/constant/locationCode';
import { useAppDispatch } from '@/redux/hooks';
import { setFlightData } from '@/redux/reducers/flightReducer';
import { Button, Col, DatePicker, Form, Radio, Row, Select } from 'antd';
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
	const dispatch = useAppDispatch();

	const router = useRouter();

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

		if (data.typeFlight === 'mot_chieu') delete body.dateReturn;

		const res = await api.searchFlight(body);
		if (res.data) {
			dispatch(setFlightData(res.data.data))
			router.push("/flights")
		}
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
								className='w-full'
								size='large'
								options={LOCATION_CODE?.map((code) => ({ value: code, label: code }))}
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
								className='w-full'
								options={LOCATION_CODE?.map((code) => ({ value: code, label: code }))}
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
	);
};

export default FindFlightComponent;
