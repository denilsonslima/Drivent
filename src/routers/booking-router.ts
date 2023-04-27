import { Router } from 'express';
import { getBookingByUser, postBookingByUser, updateBookingByUser } from '@/controllers/booking-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { createBookingSchema } from '@/schemas';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBookingByUser)
  .post('/', validateBody(createBookingSchema), postBookingByUser)
  .put('/:bookingId', validateBody(createBookingSchema), updateBookingByUser);

export { bookingRouter };
