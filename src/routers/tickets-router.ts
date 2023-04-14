import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createTicket, getTicketType } from '@/controllers';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken).get('/types', getTicketType).post('/', createTicket).get('/');

export { ticketRouter };
