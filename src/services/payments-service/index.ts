import { Payment } from '@prisma/client';
import { invalidCredentialsError } from '../authentication-service';
import paymentRepository from '@/repositories/payment-repository';
import { cannotEnrollBeforeStartDateError, notFoundError, unauthorizedError } from '@/errors';
import { validateBody } from '@/protocols';

async function getPaymentInfo(id: number, userId: number): Promise<Payment> {
  if (!id) throw cannotEnrollBeforeStartDateError();

  const validateId = await paymentRepository.validateTicketOwnership(id);
  if (!validateId) throw notFoundError();

  if (validateId.Enrollment.User.id !== userId) throw unauthorizedError();

  const payment = await paymentRepository.findFirst(id);
  if (!payment) throw notFoundError();

  return payment;
}

async function createPayment(data: validateBody, userId: number) {
  const { ticketId, cardData } = data;
  const { issuer, number } = cardData;
  const validateTicketId = await paymentRepository.findByTicketId(data.ticketId);
  if (!validateTicketId) {
    throw notFoundError();
  }
  const price = validateTicketId.TicketType.price;

  const validateUser = await paymentRepository.validateTicketOwnership(data.ticketId);
  if (validateUser.Enrollment.User.id !== userId) {
    throw invalidCredentialsError();
  }

  await paymentRepository.updateTicket(data.ticketId);

  const result = paymentRepository.createPayment({
    ticketId,
    price,
    issuer: issuer,
    cardLastDigits: number.toString().slice(-4),
  });
  return result;
}

const paymentService = {
  getPaymentInfo,
  createPayment,
};

export default paymentService;
