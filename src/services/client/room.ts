import Room from "@/entities/Room";
import FullRoom from "@/errors/FullRoom";
import InvalidDataError from "@/errors/InvalidData";
import NotFoundError from "@/errors/NotFoundError";

export async function getRoomById(roomId: string) {
  if(!parseInt(roomId)) throw new InvalidDataError("RoomID invalid", []);
  return Room.findOne(roomId);
}

export async function reserveOne(roomId: string) {
  const room = await getRoomById(roomId);
  if(!room) throw new NotFoundError();
  if(room.available === 0) throw new FullRoom();
  return Room.reserveOne(roomId);
}
