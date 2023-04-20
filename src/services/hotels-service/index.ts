import { Hotel } from '@prisma/client';
import { notFoundError, paymentRequiredError } from '@/errors';
import hotelsRepository from '@/repositories/hotels-repository';

async function getHotels(id: number): Promise<Hotel[]> {
  await validateRegistrationTicket(id);

  const hotels = await hotelsRepository.getHotels();

  if (hotels.length === 0) throw notFoundError();
  return hotels;
}

async function getHotelbyId(userId: number, hotelId: number) {
  await validateRegistrationTicket(userId);

  const hotels = await hotelsRepository.getHotelbyId(hotelId);

  if (!hotels) throw notFoundError();
  return hotels;
}

async function validateRegistrationTicket(id: number) {
  const validate = await hotelsRepository.validateRegistrationTicket(id);
  if (!validate || !validate.Ticket[0]) throw notFoundError();
  const { status, TicketType } = validate.Ticket[0];

  if (status !== 'PAID' || TicketType.isRemote || !TicketType.includesHotel) throw paymentRequiredError();
}
export default { getHotels, getHotelbyId };
