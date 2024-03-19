'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setOrderChanging } from '@/redux/reducers/flightReducer';
import { objectToQueryString } from '@/utils/functionHelper';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
type SearchParam = {
	code: string;
	name: string;
	email: string;
};
const FormGetInfoTicket = () => {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const dispatch = useAppDispatch();
	const { orderChanging } = useAppSelector((state) => state.flight);
	const router = useRouter();
	const onSubmit = async (data: SearchParam) => {
		const res = await fetch('api/ticket?code=' + data.code, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		const json = await res.json();
		if (json.emailCustomer) {
			dispatch(setOrderChanging(json));
			setIsOpenModal(true);
		}
	};
	const handleOk = () => {
		// success
		//fail
		dispatch(setOrderChanging(undefined));
		//end
		setIsOpenModal(false);
		router.push('/change-ticket/choice?' + objectToQueryString({ from: orderChanging?.from, to: orderChanging?.to, dateDeparture: orderChanging?.date, airlineCode: orderChanging?.airlineCode }));
	};
	return (
		<Row>
			<Col span={24}>
				<div>
					<h1 className='text-xl font-bold py-4'>Thông tin chi tiết vé của bạn</h1>
					<p className='text-lg py-2'>Bạn muốn thay đổi chuyến bay đã đặt, đổi lịch trình bay hay mua thêm dịch vụ hành lý, chỗ ngồi, suất ăn..., vui lòng điền thông tin bên dưới:</p>
					<Form onFinish={onSubmit}>
						<Form.Item<SearchParam>
							name={'code'}
							rules={[{ required: true, message: 'Please input your Code!' }]}
						>
							<Input
								placeholder='Mã đặt chỗ'
								className='p-2 text-lg'
							/>
						</Form.Item>
						<Form.Item<SearchParam>
							name={'name'}
							rules={[{ required: true, message: 'Please input your Code!' }]}
						>
							<Input
								placeholder='Họ và tên trên vé'
								className='p-2 text-lg'
							/>
						</Form.Item>
						<Form.Item<SearchParam>
							name={'email'}
							rules={[{ required: true, message: 'Please input your Code!' }]}
						>
							<Input
								placeholder='Email xác thực'
								className='p-2 text-lg'
							/>
						</Form.Item>
						<Button
							shape='round'
							htmlType='submit'
							size='large'
							className='hover:bg-yellow-100 hover:text-black'
							style={{ background: '#FFDE02', border: '1px solid #FFDE02' }}
						>
							Kiểm tra
						</Button>
					</Form>
				</div>
			</Col>
			<Modal
				open={isOpenModal}
				title='Xác thực thông tin khách hàng'
				okButtonProps={{ disabled: false }}
				onOk={handleOk}
				onCancel={() => setIsOpenModal(false)}
			>
				<Form>
					<Form.Item
						name={'code'}
						rules={[{ required: true, message: 'Please input your Code!' }]}
						label={<p className='block'>Vui lòng nhập mã xác thực đã gửi đến mail của bạn</p>}
					>
						<Input
							placeholder='Mã xác thực'
							className='p-2 text-sm'
						/>
					</Form.Item>
				</Form>
			</Modal>
		</Row>
	);
};

export default FormGetInfoTicket;
