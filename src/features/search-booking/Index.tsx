import { Col, Row } from 'antd';
import FormSearchBooking from './component/FormSearchBooking';

const SearchBookingComponent = () => {
	return (
		<div className='px-16 py-8'>
			<Row justify={'space-between'}>
				<Col span={10}>
					<FormSearchBooking />
				</Col>
				<Col span={12}>
					<img
						src='https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/trang-chuyen-bay-cua-toi-vn-1704339551513.jpg'
						alt='khuyenmai'
					/>
				</Col>
			</Row>
		</div>
	);
};

export default SearchBookingComponent;
