export interface ActivityData {
  name: string;
  eventDayId: number;
  startTime: Date;
  endTime: Date;
  vacancy: number;
  locationId: number;
}

export interface ActivityUser {
  userId: number;
  activityId: number;
}
