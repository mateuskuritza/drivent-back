import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import Ticket from "@/entities/Ticket";

@Entity("accommodations")
export default class Accommodation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  price: number;

  @OneToOne(() => Ticket, ticket => ticket.accommodation)
  ticket: Ticket;

  static async getAccommodationInfo() {
    const accommodations = await this.find();

    const getName = (name: string) => accommodations.find(a => a.name === name).name;
    const getPrice = (name: string) => accommodations.find(a => a.name === name).price;

    return {
      name: getName,
      price: getPrice,
    };
  }
}
