import Activities from "@/entities/Activities";
import ActivitiesUsers from "@/entities/ActivitiesUsers";
import CannotRegisterActivity from "@/errors/CannotRegisterActivity";
import { ActivityUser } from "@/interfaces/activity";

export async function getActivities(activityUserData: ActivityUser) {
  const activities = await Activities.getActivities();
  const subscription = await ActivitiesUsers.getByUserId(activityUserData.userId);

  return { activities, subscription };
}

export async function createNewSubscription(activityUserData: ActivityUser) {
  const result = await getActivities(activityUserData);

  const selectedActivity = result.activities.find(i => (activityUserData.activityId = i.id));

  const conflict = result.subscription.map(s => {
    return result.activities.find(
      a =>
        s.activityId === a.id &&
        ((selectedActivity.startTime > a.startTime && selectedActivity.startTime < a.endTime) ||
          (selectedActivity.endTime > a.startTime && selectedActivity.endTime < a.endTime)),
    );
  });

  if (conflict.length > 0) {
    throw new CannotRegisterActivity();
  } else {
    await ActivitiesUsers.createOrUpdate(activityUserData);
  }
}

export async function updateVacancy(activityUserData: ActivityUser) {
  await Activities.updateVacancy(activityUserData);
}
