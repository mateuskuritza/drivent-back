import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, AfterLoad } from "typeorm";
import Room from "./Room";

@Entity("hotels")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  size: number;

  @Column({ default: null })
  vacancies: number;

  @OneToMany(() => Room, room => room.hotel)
  @JoinColumn()
  rooms: Room[];
}
