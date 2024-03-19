import { NextRequest, NextResponse } from 'next/server';
import { createTicket, getTicket } from '../../../../prisma';
import nodemailer from 'nodemailer';
import { getLocationName } from '@/utils/functionHelper';
import dayjs from 'dayjs';

export const POST = async (req: Request) => {
	try {
		const data = await req.text();
		const body = JSON.parse(data);

		const ticket = await createTicket(body);

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

		const html = ticket?.map(
			(item) => `
		<ul>
		<li>Tên khách hàng: ${item?.nameCustomer}</li>
		<li>Số điện thoại: ${item.phoneCustomer}</li>
		<li>Email: ${item.emailCustomer}</li>
		<li>Mã chuyến bay: ${item.code}</li>
		<li>Đi từ: ${getLocationName(item.from)}</li>
		<li>Nơi đến: ${getLocationName(item.to)}</li>
		<li>Thời gian đi: ${dayjs(body.dateDeparture).format('DD/MM/YYYY HH:mm')}</li>
		<li>Thời gian đến: ${dayjs(body.dateArrival).format('DD/MM/YYYY HH:mm')}</li>
	  </ul>`,
		);

		const mainOptions = {
			from: 'Vé máy bay',
			to: ticket[0]?.emailCustomer,
			subject: 'Khách hàng đã mua vé máy bay',
			html: `
			<p>Thông tin:</p>
			${html}
			  `,
		};

		await transporter.sendMail(mainOptions);

		return NextResponse.json({ ticket }, { status: 200 });
	} catch (e) {
		return NextResponse.json({ message: e }, { status: 500 });
	}
};

export const GET = async (request: NextRequest) => {
	try {
		const code = request.nextUrl.searchParams.get('code');
		const ticket = await getTicket(code as string);
		return NextResponse.json({ ticket }, { status: 200 });
	} catch (e) {
		return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 500 });
	}
};
