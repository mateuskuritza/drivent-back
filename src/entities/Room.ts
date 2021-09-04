import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Hotel from "./Hotel";

@Entity("rooms")
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: number;

  @Column()
  available: number;

  @ManyToOne(() => Hotel, hotel => hotel.rooms)
  hotel: Hotel;

  static async reserveOne(roomId: string) {
    const room = await this.findOne(roomId);
    room.available -= 1;
    const newRoom = await this.save(room);
    return newRoom;
  }
}
