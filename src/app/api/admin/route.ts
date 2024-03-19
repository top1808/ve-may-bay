import { NextResponse } from 'next/server';
import { getAllTicket } from '../../../../prisma';

export const GET = async () => {
	try {
		const tickets = await getAllTicket();
		return NextResponse.json(tickets, { status: 200 });
	} catch (e) {
		return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 500 });
	}
};
