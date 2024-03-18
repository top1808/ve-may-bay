import { generateTicketCode } from '@/utils/functionHelper';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTicket = async () => {
	const ticket = await prisma.ticket.create({
		data: {
            code: generateTicketCode(),
            airlineCode: "airlineCode",
            date: "2024-12-21",
            nameCustomer: "le top",
            phoneCustomer: "0123123213",
            emailCustomer: "top@gmail.com",
            from: "SGN",
            to: "HAN",
        }
	});
	return ticket;
};
