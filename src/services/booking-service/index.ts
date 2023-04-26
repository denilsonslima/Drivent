import { Room } from '@prisma/client';
import { forbiddenError, notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import hotelsRepository from '@/repositories/hotels-repository';

async function getBookingByUser(id: number): Promise<{
  id: number;
  Room: Room;
}> {
  const booking = await bookingRepository.getBookingByUser(id);
  if (!booking) throw notFoundError();

  return booking;
}

async function postBookingByUser(userId: number, roomId: number) {
  await hotelsRepository.validateRegistrationTicket(userId);

  const findRoomId = await bookingRepository.findRoomId(roomId);
  if (!findRoomId) throw notFoundError();
  if (findRoomId.Booking.length >= findRoomId.capacity) throw forbiddenError('No vacancies'); //erro 403

  const res = await bookingRepository.postBookingByUser(userId, roomId);
  return { bookingId: res.id };
}

export default { getBookingByUser, postBookingByUser };
