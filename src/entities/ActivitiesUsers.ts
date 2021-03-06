import { ActivityUser } from "@/interfaces/activity";

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import User from "./User";
import Activities from "./Activities";

@Entity("activitiesUsers")
export default class ActivitiesUsers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  activityId: number;

  @ManyToOne(() => User, userId => userId.id)
  user: User;

  @ManyToOne(() => Activities, activityId => activityId.id, { eager: true })
  @JoinColumn()
  activity: Activities;

  populateFromData(data: ActivityUser) {
    this.userId = data.userId;
    this.activityId = data.activityId;
  }

  static async getByUserId(userId: number) {
    const activities = await this.find({ userId: userId });

    return activities;
  }

  static async findSpecific(data: ActivityUser) {
    const activity = await this.findOne({ where: { userId: data.userId, activityId: data.activityId } });

    return activity;
  }

  static async createOrUpdate(subscriptionData: ActivityUser) {
    let activity = await this.findSpecific(subscriptionData);

    activity ||= ActivitiesUsers.create();
    activity.populateFromData(subscriptionData);

    await activity.save();
  }
}
