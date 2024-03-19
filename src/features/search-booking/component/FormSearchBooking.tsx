'use client';
import React from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
type SearchParam = {
	code: string;
	name: string;
	date: string;
};
const FormSearchBooking = () => {
	const onSubmit = async (data: SearchParam) => {
		console.log('🚀 ~ onSubmit ~ data:', data);
		const res = await fetch('api/ticket?code=' + data.code, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		const json = await res.json();
		console.log('🚀 ~ onSubmit ~ json:', json);
	};

	return (
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
				{/* <Form.Item<SearchParam>
					name={'name'}
					rules={[{ required: true, message: 'Please input your name!' }]}
				>
					<Input
						placeholder='Họ và tên'
						className='p-2 text-lg'
					/>
				</Form.Item>
				<Form.Item<SearchParam>
					name='date'
					label={<p className='text-lg    '>Chọn Ngày Xuất Phát</p>}
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
				</Form.Item> */}
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
	);
};

export default FormSearchBooking;
