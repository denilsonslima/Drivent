import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBookingByUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  try {
    const booking = await bookingService.getBookingByUser(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    next(error);
  }
}

export async function postBookingByUser(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId);
  const roomId = Number(req.body.roomId);
  try {
    const booking = await bookingService.postBookingByUser(userId, roomId);
    return res.status(httpStatus.OK).send(booking);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send({
        message: err.message,
      });
    }
    return res.status(httpStatus.FORBIDDEN).send({
      message: err.message,
    });
  }
}

export async function updateBookingByUser(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId);
  const roomId = Number(req.body.roomId);
  const bookingId = Number(req.params.bookingId);
  try {
    const booking = await bookingService.updateBookingByUser(userId, roomId, bookingId);
    return res.status(httpStatus.OK).send(booking);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send({
        message: err.message,
      });
    }
    return res.status(httpStatus.FORBIDDEN).send({
      message: err.message,
    });
  }
}
