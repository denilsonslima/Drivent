import { Router } from 'express';
import { getBookingByUser, postBookingByUser } from '@/controllers/booking-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { createBookingSchema } from '@/schemas';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBookingByUser)
  .post('/', validateBody(createBookingSchema), postBookingByUser);

export { bookingRouter };
