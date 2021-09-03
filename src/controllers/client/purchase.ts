import { Request, Response } from "express";
import httpStatus from "http-status";

import * as purchaseService from "@/services/client/purchase";

// export async function savePaymentInfo(req: Request, res: Response) {
//   const enrollmentData = req.body as EnrollmentData;
//   enrollmentData.userId = req.user.id;
//   await purchaseService.createNewEnrollment(enrollmentData);
//   res.sendStatus(httpStatus.OK);
// }

export async function getPaymentInfo(req: Request, res: Response) {
  const purchaseInfo = await purchaseService.getPurchase(req.user.id);

  if (!purchaseInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(purchaseInfo).status(httpStatus.OK);
}
