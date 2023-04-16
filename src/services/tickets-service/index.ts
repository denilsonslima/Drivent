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
  if (!user) throw notFoundError();

  const payment = await ticketRepository.createTicket(ticketTypeId, user.id);

  return payment;
}

async function findTicket(id: number) {
  const user = await ticketRepository.findEnrollmetId(id);
  if (!user) throw notFoundError();

  const result = await ticketRepository.findTicket(user.id);
  if (!result) throw notFoundError();

  return result;
}

const ticketService = {
  getTicketType,
  createTicket,
  findTicket,
};

export default ticketService;
