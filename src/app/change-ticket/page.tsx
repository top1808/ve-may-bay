import ChangeTicketComponent from '@/features/change-ticket/Index';
import { Col, Row } from 'antd';
import Image from 'next/image';
import React from 'react';

const ChangeTicket = () => {
	return (
		<div>
			<div className='p-8'>
				<h1 className='text-xl font-bold text-center'></h1>
			</div>
			<div className='bg-white p-8'>
				<Row
					justify={'space-between'}
					gutter={[16, 16]}
				>
					<Col span={10}>
						<ChangeTicketComponent />
					</Col>
					<Col span={10}>
						<Image
							src={'/images/may-bay.jpg'}
							width={2000}
							height={300}
							alt={'may-bay-vietjet'}
						/>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default ChangeTicket;
