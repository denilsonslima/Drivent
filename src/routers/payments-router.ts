import { Router } from 'express';
import { createPayment, getPaymentInfo } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createPaymentSchema } from '@/schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', getPaymentInfo)
  .post('/process', validateBody(createPaymentSchema), createPayment);

export { paymentsRouter };
