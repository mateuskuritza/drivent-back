import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import Hotel from "./Hotel";
import User from "./User";

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

  @Column()
  hotelId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  userId: number;

  static async reserveOne(roomId: number, userId: number) {
    const room = await this.findOne(roomId);
    room.available -= 1;
    room.userId = userId;
    const newRoom = await this.save(room);
    return newRoom;
  }

  static async roomInfosByUserId(userId: number) {
    return this.findOne({ where: { userId }, relations: ["hotel"] });
  }
}
