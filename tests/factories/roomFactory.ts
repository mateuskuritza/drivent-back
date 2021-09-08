import faker from "faker";

import Room from "../../src/entities/Room";

export async function createRoom() {
  const room = Room.create({
    name: "101",
    size: 3,
    available: 3
  });

  await room.save();

  return room;
}

export async function createFullRoom() {
  const room = Room.create({
    name: "101",
    size: 3,
    available: 0
  });
  
  await room.save();
  
  return room;
}
  
