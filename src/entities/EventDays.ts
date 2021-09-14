import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Activities from "./Activities";

@Entity("eventDays")
export default class EventDays extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @OneToMany(() => Activities, activity => activity.id)
  activity: Activities;
}
