import { Payment } from '@prisma/client';
import paymentRepository from '@/repositories/payment-repository';
import { cannotEnrollBeforeStartDateError, unauthorizedError } from '@/errors';

async function getPaymentInfo(id: number): Promise<Payment> {
  if (!id) throw cannotEnrollBeforeStartDateError();
  const payment = await paymentRepository.findFirst(id);

  if (!payment) throw unauthorizedError();
  return payment;
}

const paymentService = {
  getPaymentInfo,
};

export default paymentService;
