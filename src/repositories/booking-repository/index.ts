import { Room } from '@prisma/client';
import { prisma } from '@/config';

async function getBookingByUser(userId: number): Promise<{
  id: number;
  Room: Room;
}> {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function postBookingByUser(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
    select: {
      id: true,
    },
  });
}

async function findRoomId(id: number) {
  return prisma.room.findUnique({
    where: {
      id,
    },
    include: {
      Booking: true,
    },
  });
}

export default { getBookingByUser, postBookingByUser, findRoomId };
