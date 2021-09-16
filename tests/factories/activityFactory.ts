import faker from "faker";

import Activities from "../../src/entities/Activities";
import EventDays from "../../src/entities/EventDays";
import Locations from "../../src/entities/Locations";
import ActivitiesUsers from "../../src/entities/ActivitiesUsers";

export async function create(eventDayId: number, locationId: number) {
  const activity = Activities.create({
    name: faker.name.jobArea(),
    eventDayId,
    startTime: faker.date.past(),
    endTime: faker.date.future(),
    vacancy: faker.datatype.number({ min: 1 }),
    locationId,
  });

  await activity.save();

  return activity;
}

export async function createEventDay() {
  const date = EventDays.create({
    date: faker.date.future(),
  });
  await date.save();

  return date;
}

export async function createLocation() {
  const location = Locations.create({
    name: faker.address.cityName(),
  });
  await location.save();

  return location;
}

export async function registerUserToActivity(userId: number, activityId: number) {
  return ActivitiesUsers.createOrUpdate({ userId, activityId });
}
