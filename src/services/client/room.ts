import Room from "@/entities/Room";

export async function getRoomById(roomId: number) {
  return Room.findOne(roomId);
}

export async function reserveOne(roomId: number, userId: number) {
  return Room.reserveOne(roomId, userId);
}
