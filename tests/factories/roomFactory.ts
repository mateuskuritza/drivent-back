import faker from "faker";

import Room from "../../src/entities/Room";

export async function createRoom(hotelId: number) {
  const room = Room.create({
    name: "101",
    size: 3,
    available: 3,
    hotelId: hotelId
  });

  await room.save();

  return room;
}

export async function createFullRoom(hotelId: number) {
  const room = Room.create({
    name: "101",
    size: 3,
    available: 0,
    hotelId: hotelId
  });
  
  await room.save();
  
  return room;
}
  
