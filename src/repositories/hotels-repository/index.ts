import { Hotel, Room, TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function validateRegistrationTicket(userId: number): Promise<{
  Ticket: {
    status: TicketStatus;
    TicketType: TicketType;
  }[];
}> {
  return prisma.enrollment.findFirst({
    where: {
      userId,
    },
    select: {
      Ticket: {
        select: {
          status: true,
          TicketType: true,
        },
      },
    },
  });
}

async function getHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function getHotelbyId(id: number): Promise<
  Hotel & {
    Rooms: Room[];
  }
> {
  return prisma.hotel.findUnique({
    where: {
      id,
    },
    include: {
      Rooms: true,
    },
  });
}

export default { validateRegistrationTicket, getHotels, getHotelbyId };
