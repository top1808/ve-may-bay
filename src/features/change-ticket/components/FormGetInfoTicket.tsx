'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setOrderChanging } from '@/redux/reducers/flightReducer';
import { objectToQueryString } from '@/utils/functionHelper';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
type SearchParam = {
	code: string;
	name: string;
	email: string;
};
const FormGetInfoTicket = () => {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [validateCode, setValidateCode] = useState('');
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


		if (json?.ticket?.emailCustomer) {
			const dateToCompare = new Date(json.date);
			const today = new Date();
			if (dateToCompare <= today) {
				Swal.fire({
					title: 'Error!',
					text: 'Vé của bạn không thể đổi',
					icon: 'error',
					confirmButtonText: 'Tắt',
				});
				return;
			} else {
				dispatch(setOrderChanging(json?.ticket));
				setIsOpenModal(true);
				const res = await fetch('api/flight', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});
				const validateCode = await res.json();
				setValidateCode(validateCode);
			}
		}
	};
	const handleOk = () => {
		setIsOpenModal(false);
		router.push('/change-ticket/choice' + objectToQueryString({ from: orderChanging?.from, to: orderChanging?.to, dateDeparture: dayjs(orderChanging?.dateDeparture).format("YYYY-MM-DD"), airlineCode: orderChanging?.airlineCode }));
	};

	const onValidate = (data: any) => {
		if (data.code === validateCode) {
			handleOk();
		} else {
			Swal.fire({
				title: "Mã xác thực không đúng",
				icon: "error"
			})
		}
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
				// okButtonProps={{ disabled: false }}
				// onOk={handleOk}
				onCancel={() => setIsOpenModal(false)}
				footer={<></>}
			>
				<Form onFinish={onValidate}>
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
					<div className='flex justify-center'>
						<Button
							type='primary'
							htmlType='submit'
						>
							Xác nhận
						</Button>
					</div>
				</Form>
			</Modal>
		</Row>
	);
};

export default FormGetInfoTicket;
