import { NextRequest, NextResponse } from 'next/server';
import { changeTicket, createTicket, getTicket } from '../../../../prisma';
import nodemailer from 'nodemailer';
import { getLocationName } from '@/utils/functionHelper';
import dayjs from 'dayjs';

export const POST = async (req: Request) => {
	try {
		const data = await req.text();
		const body = JSON.parse(data);

		const ticket = await changeTicket(body);

		if (!ticket) {
			return NextResponse.json({ message: 'Lỗi' }, { status: 404 });
		}

		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			host: 'smtp.gmail.com',
			port: 465,
			auth: {
				user: 'top180802@gmail.com',
				pass: 'zumm rcqk rjki atcm',
			},
		});

		const mainOptions = {
			from: 'Vé máy bay',
			to: body?.emailCustomer,
			subject: 'Khách hàng đã đổi vé máy bay',
			html: `
			  <p>Thông tin:</p>
			  <ul>
				<li>Tên khách hàng: ${body?.nameCustomer}</li>
				<li>Số điện thoại: ${body.phoneCustomer}</li>
				<li>Email: ${body.emailCustomer}</li>
				<li>Mã chuyến bay: ${body.code}</li>
				<li>Đi từ: ${getLocationName(body.from)}</li>
				<li>Nơi đến: ${getLocationName(body.to)}</li>
				<li>Thời gian đi: ${dayjs(body.dateDeparture).format("DD/MM/YYYY HH:mm")}</li>
				<li>Thời gian đến: ${dayjs(body.dateArrival).format("DD/MM/YYYY HH:mm")}</li>
			  </ul>
			`,
		};

		await transporter.sendMail(mainOptions);

		return NextResponse.json(true, { status: 200 });
	} catch (e) {
		return NextResponse.json({ message: e }, { status: 500 });
	}
};
