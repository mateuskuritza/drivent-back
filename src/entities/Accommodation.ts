import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Purchase from "@/entities/Purchase";

@Entity("accommodations")
export default class Accommodation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  price: number;

  @OneToMany(() => Purchase, purchase => purchase.accommodation)
  purchase: Purchase;

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
