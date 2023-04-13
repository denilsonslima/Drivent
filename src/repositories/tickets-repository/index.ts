import { prisma } from '@/config';

async function selectTypeAll() {
  return prisma.ticketType.findMany();
}

async function createTicket(id: number) {
  return prisma.ticketType.findMany();
}

const ticketRepository = {
  selectTypeAll,
  createTicket,
};

export default ticketRepository;
