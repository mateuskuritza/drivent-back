import { Request, Response } from "express";

import * as hotelService from "@/services/client/hotel";
import * as roomService from "@/services/client/room";
import NotFoundError from "@/errors/NotFoundError";
import FullRoom from "@/errors/FullRoom";
import InvalidDataError from "@/errors/InvalidData";
import ConflictError from "@/errors/ConflictError";

export async function get(req: Request, res: Response) {
  const hotels = await hotelService.getHotels();
  res.send(hotels);
}

export async function getRooms(req: Request, res: Response) {
  const hotelId = Number(req.params.hotelId);
  if(!hotelId || isNaN(hotelId)) throw new InvalidDataError("hotelID invalid", []);
  const hotel = await hotelService.getHotelById(hotelId);
  if(!hotel) throw new NotFoundError();
  const rooms = await hotelService.getHotelRooms(hotelId);
  res.send(rooms);
}

export async function reserveRoom(req: Request, res: Response) {
  const roomId = Number(req.params.roomId);
  const userId = Number(req.user.id);
  if(!roomId || isNaN(roomId)) throw new InvalidDataError("roomID invalid", []);
  const userRoom = await roomService.getRoomByUserId(userId);
  if(userRoom) throw new ConflictError("Already reserved a room");
  const room = await roomService.getRoomById(roomId);
  if(!room)  throw new NotFoundError();
  if(room.available === 0) throw new FullRoom();
  const newRoom = await roomService.reserveOne(roomId, userId);
  res.send(newRoom);
}
  
export async function changeReserve(req: Request, res: Response) {
  const roomId = Number(req.params.roomId);
  const userId = Number(req.user.id);
  if(!roomId || isNaN(roomId)) throw new InvalidDataError("roomID invalid", []);
  const room = await roomService.getRoomById(roomId);
  if(!room)  throw new NotFoundError();
  if(room.available === 0) throw new FullRoom();
  const newRoom = await roomService.changeReserve(room, userId);
  res.send(newRoom);
}

export async function userRoomInfos(req: Request, res: Response) {
  const userId = Number(req.user.id);
  const room = await roomService.roomInfosByUserId(userId);
  if(!room) throw new NotFoundError();
  res.send(room);
}
