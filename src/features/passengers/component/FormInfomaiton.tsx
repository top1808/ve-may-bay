'use client';
import InforTicket from '@/features/Home/components/InforTicket';
import { useAppSelector } from '@/redux/hooks';
import { Button, Col, Form, Input, Row } from 'antd';
import { useEffect } from 'react';

export const FormInfomation = () => {
	const body = useAppSelector((state) => state.flight.dataPaying);
	const [form] = Form.useForm();
	useEffect(() => {
		form.setFieldsValue({
			customerName: '',
			customerPhone: '',
			customerEmail: '',
		});
	}, [form]);
	const onSubmit = async (data: Passenger) => {
		const response = await fetch('api/ticket', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...data, ...body }),
		})
			.then((response) => {})
			.catch((error) => {});
		console.log('🚀 ~ onSubmit ~ response:', response);
	};
	return (
		<div className='py-10'>
			<div className='p-5'>
				<Row
					gutter={[16, 16]}
					justify={'space-between'}
				>
					<Col span={15}>
						<h1 className='text-xl font-bold text-center mb-4'>Thông tin khách hàng</h1>
						<Form
							form={form}
							autoComplete='off'
							onFinish={onSubmit}
						>
							<Form.Item<Passenger>
								name={'nameCustomer'}
								rules={[{ required: true, message: 'Please input your name!' }]}
							>
								<Input
									placeholder='Họ và tên'
									className='p-2'
								/>
							</Form.Item>
							<Form.Item<Passenger>
								name={'phoneCustomer'}
								rules={[{ required: true, message: 'Please input your phone!' }]}
							>
								<Input
									placeholder='Số điện thoại'
									className='p-2'
								/>
							</Form.Item>
							<Form.Item<Passenger> name='emailCustomer'>
								<Input
									placeholder='Email'
									className='p-2'
								/>
							</Form.Item>
							<Form.Item<Passenger> name='address'>
								<Input
									placeholder='Address'
									className='p-2'
								/>
							</Form.Item>
							<div className='w-full flex justify-center items-center'>
								<Button
									type='primary'
									htmlType='submit'
									size='large'
								>
									Đi tiếp
								</Button>
							</div>
						</Form>
					</Col>
					<Col span={6}>
						<InforTicket data={body!} />
					</Col>
				</Row>
			</div>
		</div>
	);
};
