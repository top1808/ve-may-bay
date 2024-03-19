import ManagementComponent from '@/features/management/Index';
import React from 'react';

const Management = () => {
	return (
		<div>
			<h1 className='text-xl font-bold p-8'>List orders</h1>
			<ManagementComponent data={undefined} />
		</div>
	);
};

export default Management;
