'use client';
import { Button, Form, Input } from 'antd';
import React from 'react';
type FieldType = {
	email?: string;
	password?: string;
};
const LoginComponent = () => {
	const onsubmit = async (data: FieldType) => {};
	return (
		<div className='p-8 bg-white'>
			<h1 className='text-center text-white md:text-black text-xl font-bold'>Login</h1>
			<Form
				name='login'
				onFinish={onsubmit}
				autoComplete='off'
				className='m-12'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
			>
				<Form.Item<FieldType>
					label={<label className='text-white md:text-black'>Email</label>}
					name='email'
					labelAlign='left'
					hasFeedback
					rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item<FieldType>
					label={<label className='text-white md:text-black'>Password</label>}
					name='password'
					labelAlign='left'
					hasFeedback
					rules={[
						{ required: true, message: 'Please input your password!' },
						{ min: 6, message: 'Min length password is 6' },
					]}
				>
					<Input.Password />
				</Form.Item>
				<Button
					htmlType='submit'
					type='primary'
				>
					Login
				</Button>
			</Form>
		</div>
	);
};

export default LoginComponent;
