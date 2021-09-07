import TicketData from "@/interfaces/ticket";
import Modality from "@/entities/Modality";
import Accommodation from "@/entities/Accommodation";

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modalityId: number;

  @OneToOne(() => Modality, (modality: Modality) => modality.ticket, { eager: true })
  @JoinColumn()
  modality: Modality;

  @Column()
  accommodationId: number;

  @OneToOne(() => Accommodation, (accommodation: Accommodation) => accommodation.ticket, { eager: true })
  @JoinColumn()
  accommodation: Accommodation;

  @Column()
  totalPrice: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  static async getTicketInfo() {
    //const tickets = await this.find();

    return {};
  }

  static async newTicketInfo(data: TicketData) {
    let price = 10000;
    const modalityId = data.modality === "presential" ? 1 : 2;
    if (modalityId === 1) {
      price += 15000;
    }
    const accommodationId = data.accommodation === "withHotel" ? 2 : 1;
    if (accommodationId === 2) {
      price += 35000;
    }
    const newTicket = this.create({
      modalityId: modalityId,
      accommodationId: accommodationId,
      totalPrice: price,
    });
    await newTicket.save();

    /* const t = await this.find();
    console.log(t); */
  }
}
