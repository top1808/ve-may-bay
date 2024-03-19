import { convertStringToDayTime, customMoney, getAirlineName, getLocationName } from '@/utils/functionHelper';
import React from 'react';

const OrderSearch = ({ data }: { data: any }) => {
	console.log(data);

	return (
		<>
			{data && typeof data !== 'string' && (
				<div>
					<div className='mt-4 w-full'>
						<h1 className='text-xl text-center font-bold'>Thông tin người đặt</h1>
						<div>
							<p className='text-lg'>{`Người đặt: ${data.nameCustomer}`}</p>
							<p className='text-lg'>{`Số điện thoại: ${data.phoneCustomer}`}</p>
							<p className='text-lg'>{`Email: ${data.emailCustomer}`}</p>
						</div>
					</div>
					<div className='mt-4 w-full'>
						<h1 className='text-xl text-center font-bold'>Thông tin vé</h1>
						<div>
							<p className='text-lg'>{`Bay từ: ${getLocationName(data.from)}. Vào lúc: ${convertStringToDayTime(data.dateDeparture)}`}</p>
							<p className='text-lg'>{`Đến: ${getLocationName(data.to)}. Dự kiến đến vào lúc: ${convertStringToDayTime(data.dateArrival)}`}</p>
							<p className='text-lg'>{`Giá: ${customMoney(data.price)}`}</p>
							<p className='text-lg'>{`Hãng sử dụng: ${getAirlineName(data.carrierCode)!.name}`}</p>
						</div>
					</div>
				</div>
			)}
			{data && typeof data === 'string' && (
				<div className='mt-4 w-full'>
					<h1 className='text-xl text-center font-bold'>Không tìm thấy vé phù hợp</h1>
					<div></div>
				</div>
			)}
		</>
	);
};

export default OrderSearch;
