import Activities from "./Activities";

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("locations")
export default class Locations extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Activities, activity => activity.id)
  activity: Activities;
}
