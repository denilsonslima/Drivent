import { prisma } from '@/config';

async function findFirst(id: number) {
  return prisma.payment.findUnique({
    where: {
      id,
    },
  });
}

const paymentRepository = {
  findFirst,
};

export default paymentRepository;
