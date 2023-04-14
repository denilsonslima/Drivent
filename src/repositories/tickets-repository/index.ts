import { prisma } from '@/config';

async function selectTypeAll() {
  return prisma.ticketType.findMany();
}

async function createTicket(id: number, enrollment: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId: id,
      enrollmentId: enrollment,
      status: 'RESERVED',
    },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function findEnrollmetId(id: number) {
  return prisma.enrollment.findFirst({
    where: { userId: id },
    select: {
      id: true,
    },
  });
}

const ticketRepository = {
  selectTypeAll,
  createTicket,
  findEnrollmetId,
};

export default ticketRepository;
