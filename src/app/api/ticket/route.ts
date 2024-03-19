import { NextResponse } from 'next/server';
import { createTicket } from '../../../../prisma';

export const POST = async (req: Request) => {
	try {
		const data = await req.text();
		const body = JSON.parse(data);
		console.log(body);

		// const ticket = await createTicket();

		// if (!ticket) {
		// 	return NextResponse.json({ message: 'Lỗi' }, { status: 404 });
		// }

		// return NextResponse.json({ ticket }, { status: 200 });
	} catch (e) {
		return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 500 });
	}
};

// export const GET = async () => {
//   try {
//     const settings = await getSettings();

//     return NextResponse.json({ settings }, { status: 200 });
//   } catch (e) {
//     return NextResponse.json({ message: "Có lỗi xảy ra" }, { status: 500 });
//   }
// };
