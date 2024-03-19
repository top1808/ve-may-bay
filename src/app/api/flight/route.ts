
import { generateValidationCode } from '@/utils/functionHelper';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const POST = async (req: Request) => {
	try {
		const data = await req.text();
		const body = JSON.parse(data);

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: "top180802@gmail.com",
              pass: "zumm rcqk rjki atcm",
            },
          });

          const validateCode = generateValidationCode();

          const mainOptions = {
            from: "Vé máy bay",
            to: body?.email,
            subject: "Mã xác thực đổi chuyến bay",
            html: `
              <div>
                Mã xác thực của bạn là:
                <strong>${validateCode}</strong>
              </div>
            `
          };
      
          await transporter.sendMail(mainOptions);

		return NextResponse.json(validateCode, { status: 200 });
	} catch (e) {
		return NextResponse.json({ message: e }, { status: 500 });
	}
};
