import { AIRLINES, airports } from '@/constant/locationCode';

export const generateTicketCode = () => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let code = '';
	for (let i = 0; i < 6; i++) {
		code += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return code;
};
export const convertStringToDayTime = (value: string) => {
	const date = new Date(value);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	return `${hours}:${(minutes < 10 ? '0' : '') + minutes} ${day}/${(month < 10 ? '0' : '') + month}/${year}`;
};
export const getAirlineName = (code: string) => {
	const airline = AIRLINES.find((airline) => airline.code === code);
	return airline;
};
export const customMoney = (money: number) => {
	return (money! * 27000)?.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
	});
};
export const getLocationName = (code: string) => {
	const result = airports.find((a) => a.IATACode === code);
	return result?.location;
};
export const objectToQueryString = <T>(object: T): string => {
	return '?' + new URLSearchParams(object || '').toString();
};

export const generateValidationCode = () => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let code = '';
	for (let i = 0; i < 6; i++) {
		code += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return code;
};
