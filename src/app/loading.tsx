'use client';
import { Spin } from 'antd';
import React from 'react';

const Loading = () => {
	return (
		<div className='w-screen h-screen flex items-center justify-center'>
			<Spin size='large'></Spin>
		</div>
	);
};

export default Loading;
