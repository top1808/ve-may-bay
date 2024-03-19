import { NextRequest, NextResponse } from 'next/server';
import { createTicket, getTicket } from '../../../../prisma';

export const POST = async (req: Request) => {
	try {
		const data = await req.text();
		const body = JSON.parse(data);
		console.log(body);

		const ticket = await createTicket(body);

		if (!ticket) {
			return NextResponse.json({ message: 'Lỗi' }, { status: 404 });
		}

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
