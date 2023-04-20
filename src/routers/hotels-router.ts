import { Router } from 'express';
import { getHotelbyId, getHotels } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const hotelRouter = Router();
hotelRouter.all('/*', authenticateToken).get('/', getHotels).get('/:hotelId', getHotelbyId);

export { hotelRouter };
