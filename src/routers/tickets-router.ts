import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createTicket, findTicket, getTicketType } from '@/controllers';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken).get('/types', getTicketType).post('/', createTicket).get('/', findTicket);

export { ticketRouter };
