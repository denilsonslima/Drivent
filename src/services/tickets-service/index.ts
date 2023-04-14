import { TicketType } from '@prisma/client';
import ticketRepository from '@/repositories/tickets-repository';
import { cannotEnrollBeforeStartDateError, notFoundError } from '@/errors';

async function getTicketType(): Promise<TicketType[]> {
  const payment = await ticketRepository.selectTypeAll();
  return payment;
}

async function createTicket(ticketTypeId: number, userId: number) {
  if (!ticketTypeId) throw cannotEnrollBeforeStartDateError();

  const user = await ticketRepository.findEnrollmetId(userId);
  if (!user.id) throw notFoundError();

  const payment = await ticketRepository.createTicket(ticketTypeId, user.id);

  return payment;
}

const ticketService = {
  getTicketType,
  createTicket,
};

export default ticketService;
