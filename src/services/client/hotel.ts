import Hotel from "@/entities/Hotel";

export async function getHotels() {
  const hotels = await Hotel.find();
  return Promise.all(hotels.map( async (hotel) => {
    const newHotel = hotel;
    newHotel.vacancies = await getVacancies(hotel.id);
    return newHotel;
  }));
}

export async function getHotelById(id: number) {
  return Hotel.findOne(id);
}

export async function getHotelRooms(hotelId: number) {
  const hotel = await Hotel.findOne({ where: { hotelId }, relations: ["rooms"] });
  const rooms = hotel.rooms;
  return rooms.sort( (first, second) => first.id - second.id);
}

async function getVacancies(id: number) {
  const rooms = await getHotelRooms(id);
  let vacancies = 0;
  rooms.forEach( room => vacancies += room.available);
  return vacancies;
}
