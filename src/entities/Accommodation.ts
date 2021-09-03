import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("accommodations")
export default class Accommodation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;
}
