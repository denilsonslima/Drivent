import { Router } from 'express';

import { getPaymentInfo } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter
  // .all('/*', authenticateToken)
  .get('/', getPaymentInfo);

export { paymentsRouter };
