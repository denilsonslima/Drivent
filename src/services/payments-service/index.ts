import { Payment } from '@prisma/client';
import paymentRepository from '@/repositories/payment-repository';

async function getPaymentInfo(id: number): Promise<Payment> {
  const payment = await paymentRepository.findFirst(id);
  return payment;
}

const paymentService = {
  getPaymentInfo,
};

export default paymentService;
