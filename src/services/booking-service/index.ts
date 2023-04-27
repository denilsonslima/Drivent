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
  const validate = await hotelsRepository.validateRegistrationTicket(userId);
  if (!validate || !validate.Ticket[0]) throw forbiddenError();
  const { status, TicketType } = validate.Ticket[0];

  if (status !== 'PAID' || TicketType.isRemote || !TicketType.includesHotel) throw forbiddenError();

  const findRoomId = await bookingRepository.findRoomId(roomId);
  if (!findRoomId) throw notFoundError();
  if (findRoomId.Booking.length >= findRoomId.capacity) throw forbiddenError('No vacancies'); //erro 403

  const res = await bookingRepository.postBookingByUser(userId, roomId);
  return { bookingId: res.id };
}

async function updateBookingByUser(userId: number, roomId: number, bookingId: number) {
  const findBooking = await bookingRepository.findBookinById(bookingId);
  if (!findBooking || userId !== findBooking.userId) throw forbiddenError();

  const findRoomId = await bookingRepository.findRoomId(roomId);
  if (!findRoomId) throw notFoundError();
  if (findRoomId.Booking.length >= findRoomId.capacity) throw forbiddenError('No vacancies');

  await bookingRepository.updateBookingById(bookingId, roomId);
  return { bookingId };
}

export default { getBookingByUser, postBookingByUser, updateBookingByUser };
