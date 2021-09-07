import TicketData from "@/interfaces/ticket";
import Modality from "@/entities/Modality";
import Accommodation from "@/entities/Accommodation";
//import Accommodation from "@/entities/Accommodation";
//import NoVacancyAvailable from "@/errors/NoVacancyAvailable";

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

/* @Column()
enrollmentId: number;

@OneToOne(() => Enrollment, (enrollment: Enrollment) => enrollment.address)
@JoinColumn()
enrollment: Enrollment; */

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modalityId: number;

  @OneToOne(() => Modality, (modality: Modality) => modality.ticket)
  @JoinColumn()
  modality: Modality;

  @Column()
  accommodationId: number;

  @OneToOne(() => Accommodation, (accommodation: Accommodation) => accommodation.ticket)
  @JoinColumn()
  accommodation: Accommodation;

  @Column()
  totalPrice: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  static async getTicketInfo() {
    const tickets = await this.find();

    console.log(tickets);

    /*  const getTotalVacancy = (name: string) => modalities.find(m => m.name === name).totalVacancy;
    const getAvailableVacancy = (name: string) => modalities.find(m => m.name === name).availableVacancy;
    const getPrice = (name: string) => modalities.find(m => m.name === name).price;
 */
    return {};
  }

  static async newTicketInfo(data: TicketData) {
    console.log(data);
    let price = 100;
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
  }
}
