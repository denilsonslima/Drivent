import { prisma } from '@/config';

async function findFirst(id: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: id,
    },
  });
}

async function validateTicketOwnership(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });
}

const paymentRepository = {
  findFirst,
  validateTicketOwnership,
};

export default paymentRepository;
