import { prisma } from '@/config';

async function findFirst(id: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: id,
    },
  });
}

const paymentRepository = {
  findFirst,
};

export default paymentRepository;
