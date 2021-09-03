import Hotel from "@/entities/Hotel";
import Room from "@/entities/Room";

export async function getHotels() {
  return await Hotel.getHotels();
}

export async function getHotelById(id: string) {
  return Hotel.findOne(id);
}

export async function getHotelRooms(hotelId: string) {
  return Hotel.getRooms(hotelId);
}

export async function getRoomById(roomId: string) {
  return Room.findOne(roomId);
}

export async function reserveOne(roomId: string) {
  return Room.reserveOne(roomId);
}
