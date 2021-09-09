import Room from "@/entities/Room";

export async function getRoomById(roomId: number) {
  return Room.findOne(roomId);
}

export async function getRoomByUserId(userId: number) {
  return Room.findOne({ where: { userId } });
}

export async function reserveOne(roomId: number, userId: number) {
  return Room.reserveOne(roomId, userId);
}

export async function changeReserve(newRoom: Room, userId: number) {
  const oldRoom = await getRoomByUserId(userId);
  oldRoom.available = oldRoom.available + 1;
  oldRoom.userId = null;
  await oldRoom.save();
  return reserveOne(newRoom.id, userId);
}

export async function roomInfosByUserId(userId: number) {
  return Room.roomInfosByUserId(userId);
}
