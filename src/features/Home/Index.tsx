import { Col, Radio, Row } from 'antd';
import React from 'react';
import FindFlightComponent from './components/FindFlightComponent';

type HomePageProps = {};

const HomePage = (props: HomePageProps) => {
	return (
		<div className='banner'>
			<Row justify="end">
				<Col
					xs={24}
					lg={8}
				>
					<FindFlightComponent />
				</Col>
			</Row>
		</div>
	);
};

export default HomePage;
