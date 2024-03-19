import { generateTicketCode } from '@/utils/functionHelper';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTicket = async (body: any[]) => {
	const tickets: any[] = await Promise.all(
        body.map(async (item) => {
            const ticket = await prisma.ticket.create({
                data: {
                    ...item,
                    code: generateTicketCode(),
                },
            });
            return ticket;
        })
    );
	return tickets;
};

export const getTicket = async(code: string) => {
	const ticket = await prisma.ticket.findFirst({
		where: {
			code: code
		}
	})
	return ticket;
}
