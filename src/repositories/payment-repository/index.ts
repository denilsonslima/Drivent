import { prisma } from '@/config';

async function findFirst(id: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: id,
    },
  });
}

async function validateTicketOwnership(id: number) {
  return prisma.ticket.findUnique({
    where: {
      id,
    },
    select: {
      Enrollment: {
        select: {
          User: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });
}

async function findByTicketId(id: number) {
  return prisma.ticket.findUnique({
    where: {
      id,
    },
    select: {
      TicketType: {
        select: {
          price: true,
        },
      },
    },
  });
}

async function updateTicket(id: number) {
  return prisma.ticket.update({
    where: {
      id,
    },
    data: {
      status: 'PAID',
    },
  });
}

async function createPayment({ ticketId, price, issuer, cardLastDigits }: validadeData) {
  return prisma.payment.create({
    data: {
      ticketId,
      value: price,
      cardIssuer: issuer,
      cardLastDigits,
    },
  });
}

type validadeData = {
  ticketId: number;
  price: number;
  issuer: string;
  cardLastDigits: string;
};

const paymentRepository = {
  findFirst,
  validateTicketOwnership,
  findByTicketId,
  updateTicket,
  createPayment,
};

export default paymentRepository;
