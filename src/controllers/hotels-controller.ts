import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  try {
    const hotels = await hotelsService.getHotels(userId);
    return res.send(hotels);
  } catch (e) {
    next(e);
  }
}

export async function getHotelbyId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const hotelId = Number(req.params.hotelId);
  try {
    const hotels = await hotelsService.getHotelbyId(userId, hotelId);
    return res.send(hotels);
  } catch (e) {
    next(e);
  }
}
