import { Request, Response } from "express";

import * as hotelService from "@/services/client/hotel";
import * as roomService from "@/services/client/room";

export async function get(req: Request, res: Response) {
  const hotels = await hotelService.getHotels();
  res.send(hotels);
}

export async function getRooms(req: Request, res: Response) {
  const hotelId = req.params.id;
  const rooms = await hotelService.getHotelRooms(hotelId);
  res.send(rooms);
}

export async function reserveRoom(req: Request, res: Response) {
  const roomId = req.params.id;
  const newRoom = roomService.reserveOne(roomId);
  res.send(newRoom);
}
  
