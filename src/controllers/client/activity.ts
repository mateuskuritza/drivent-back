import { Request, Response } from "express";
import httpStatus from "http-status";

import * as activityService from "@/services/client/activity";
import { ActivityUser } from "@/interfaces/activity";

export async function saveActivityInfo(req: Request, res: Response) {
  const activityData = req.body as ActivityUser;

  if (typeof activityData.userId !== "number") return res.sendStatus(httpStatus.BAD_REQUEST);
  if (typeof activityData.activityId !== "number") return res.sendStatus(httpStatus.BAD_REQUEST);

  await activityService.createNewSubscription(activityData);
  res.sendStatus(httpStatus.OK);
}

export async function getActivitiesInfo(req: Request, res: Response) {
  const activitiesInfo = await activityService.getActivities({ userId: req.user.id });

  if (activitiesInfo.activities.length === 0 && activitiesInfo.subscription.length === 0) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  console.log(activitiesInfo);

  res.send(activitiesInfo).status(httpStatus.OK);
}
