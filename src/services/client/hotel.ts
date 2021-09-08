import Hotel from "@/entities/Hotel";
import InvalidDataError from "@/errors/InvalidData";
import NotFoundError from "@/errors/NotFoundError";

export async function getHotels() {
  const hotels = await Hotel.find();
  return Promise.all(hotels.map( async (hotel) => {
    const newHotel = hotel;
    newHotel.vacancies = await getVacancies(String(hotel.id));
    return newHotel;
  }));
}

export async function getHotelById(id: string) {
  if(!parseInt(id)) throw new InvalidDataError("HotelID invalid", []);
  return Hotel.findOne(id);
}

export async function getHotelRooms(hotelId: string) {
  if(!hotelId) throw new InvalidDataError("Missing hotel id param", []);
  const hotel = await Hotel.findOne({ where: { id: hotelId }, relations: ["rooms"] });
  if(!hotel) throw new NotFoundError();
  const rooms = hotel.rooms;
  return rooms.sort( (first, second) => first.id - second.id);
}

async function getVacancies(id: string) {
  const rooms = await getHotelRooms(id);
  let vacancies = 0;
  rooms.forEach( room => vacancies += room.available);
  return vacancies;
}
