import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;
}
