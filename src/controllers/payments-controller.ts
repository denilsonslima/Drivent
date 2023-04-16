import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import paymentService from '@/services/payments-service';
import { validateBody } from '@/protocols';
import { AuthenticatedRequest } from '@/middlewares';

export async function getPaymentInfo(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const ticketId = parseInt(req.query.ticketId as string);
  const { userId } = req;
  try {
    const user = await paymentService.getPaymentInfo(ticketId, userId);
    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    next(error);
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const data = req.body as validateBody;
  const { userId } = req;
  try {
    const user = await paymentService.createPayment(data, userId);
    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
