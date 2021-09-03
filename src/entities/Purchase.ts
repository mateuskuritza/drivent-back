import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Accommodations from "./Accommodation";
import Ticket from "./Ticket";

@Entity("purchases")
export default class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accommodationId: number;

  @Column()
  enrollmentsId: number;

  @Column()
  ticketId: number;

  @OneToOne(() => Ticket)
  @JoinColumn()
  ticket: Ticket;

  @OneToOne(() => Accommodations)
  @JoinColumn()
  accommodation: Accommodations;
}
