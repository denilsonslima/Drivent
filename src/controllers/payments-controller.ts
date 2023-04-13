import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import paymentService from '@/services/payments-service';

export async function getPaymentInfo(req: Request, res: Response, next: NextFunction) {
  const { ticketId } = req.query;
  try {
    const user = await paymentService.getPaymentInfo(+ticketId);
    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    next(error);
  }
}
