import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTicketType(req: Request, res: Response) {
  try {
    const user = await ticketService.getTicketType();
    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const ticketTypeId = parseInt(req.body.ticketTypeId);
  const { userId } = req;
  try {
    const user = await ticketService.createTicket(ticketTypeId, userId);
    return res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    next(error);
  }
}
