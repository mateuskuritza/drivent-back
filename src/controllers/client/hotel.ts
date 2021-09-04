import { Request, Response } from "express";

import * as service from "@/services/client/hotel";
import NotFoundError from "@/errors/NotFoundError";
import FullRoom from "@/errors/FullRoom";

export async function get(req: Request, res: Response) {
  const hotels = await service.getHotels();
  res.send(hotels);
}

export async function getRooms(req: Request, res: Response) {
  const hotelId = req.params.id;
  const hotel = await service.getHotelById(hotelId);
  if (!hotel) throw new NotFoundError();
  const rooms = await service.getHotelRooms(hotelId);
  res.send(rooms);
}

export async function reserveRoom(req: Request, res: Response) {
  const roomId = req.params.id;
  const room = await service.getRoomById(roomId);
  if (!room) throw new NotFoundError();
  if (room.available === 0) throw new FullRoom();
  const newRoom = await service.reserveOne(roomId);
  res.send(newRoom);
}
