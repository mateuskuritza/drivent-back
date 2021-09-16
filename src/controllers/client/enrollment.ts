import { Request, Response } from "express";
import httpStatus from "http-status";

import * as enrollmentService from "@/services/client/enrollment";
import * as photoService from "@/services/client/photo";
import EnrollmentData from "@/interfaces/enrollment";

export async function saveEnrollmentInfo(req: Request, res: Response) {
  const enrollmentData = req.body as EnrollmentData;
  enrollmentData.userId = req.user.id;
  await enrollmentService.createNewEnrollment(enrollmentData);
  res.sendStatus(httpStatus.OK);
}

export async function getEnrollmentInfos(req: Request, res: Response) {
  const userId = req.user.id;
  const enrollmentInfo = await enrollmentService.getEnrollmentWithAddress(userId);
  const photo = await photoService.getPhotoByUserId(userId);

  if (!enrollmentInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send({ enrollment: enrollmentInfo, photo }).status(httpStatus.OK);
}
