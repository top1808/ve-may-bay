'use client';
import React, { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import { useRouter } from 'next/navigation';
import OrderSearch from './OrderSearch';
type SearchParam = {
	code: string;
	name: string;
	date: string;
};
const FormSearchBooking = () => {
	const [order, setOrder] = useState(null);
	const rouuter = useRouter();
	const onSubmit = async (data: SearchParam) => {
		const res = await fetch('api/ticket?code=' + data.code, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		const json = await res.json();
		setOrder(json.ticket ? json.ticket : 'không tìm thấy');
	};

	return (
		<>
			<Row>
				<Col span={24}>
					<div>
						<h1 className='text-xl font-bold py-4'>CHUYẾN BAY CỦA TÔI</h1>
						<p className='text-lg py-2'>Bạn muốn xem chuyến bay đã đặt, đổi lịch trình bay hay mua thêm dịch vụ hành lý, chỗ ngồi, suất ăn..., vui lòng điền thông tin bên dưới:</p>
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
							<Button
								shape='round'
								htmlType='submit'
								size='large'
								className='hover:bg-yellow-100 hover:text-black'
								style={{ background: '#FFDE02', border: '1px solid #FFDE02' }}
							>
								Tìm kiếm
							</Button>
						</Form>
					</div>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<OrderSearch data={order} />
				</Col>
			</Row>
		</>
	);
};

export default FormSearchBooking;
