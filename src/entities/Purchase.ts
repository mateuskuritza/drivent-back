import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Accommodation from "./Accommodation";
import Ticket from "./Ticket";
import User from "./User";

@Entity("purchases")
export default class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accommodationId: number;

  @Column()
  userId: number;

  @Column()
  ticketId: number;

  @OneToOne(() => Ticket)
  @JoinColumn()
  ticket: Ticket;

  @OneToOne(() => Accommodation)
  @JoinColumn()
  accommodation: Accommodation;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  static async getByUserId(userId: number) {
    return await this.findOne({ where: { userId } });
  }
}
