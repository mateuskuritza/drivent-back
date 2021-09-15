import EventDays from "./EventDays";
import Locations from "./Locations";

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import ActivitiesUsers from "./ActivitiesUsers";
import { ActivityData, ActivityUser } from "@/interfaces/activity";

@Entity("activities")
export default class Activities extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  eventDayId: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  vacancy: number;

  @Column()
  locationId: number;

  @ManyToOne(() => EventDays, eventDayId => eventDayId.id, { eager: true })
  @JoinColumn()
  eventDay: EventDays;

  @ManyToOne(() => Locations, locationsId => locationsId.id, { eager: true })
  @JoinColumn()
  location: Locations;

  @OneToMany(() => ActivitiesUsers, activityUserId => activityUserId.id)
  activityUser: ActivitiesUsers;

  populateFromData(data: ActivityData) {
    this.name = data.name;
    this.eventDayId = data.eventDayId;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.vacancy = data.vacancy;
  }

  static async getByActivityId(activityId: number) {
    const activity = await this.findOne({ where: { id: activityId } });

    return activity;
  }

  static async getActivities() {
    const activities = await this.find();

    return activities;
  }

  static async updateVacancy(activityUser: ActivityUser) {
    const activity = await this.findOne({ where: { id: activityUser.activityId } });

    //activity.vacancy -= 1; -> newActivity = await this.save(activity); -> comparar após atualização
    activity.vacancy -= 1;
    const newActivity = await this.save(activity);
    console.log(activity, newActivity);

    await activity.save();
  }
}
