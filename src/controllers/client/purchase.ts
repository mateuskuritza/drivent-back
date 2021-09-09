import { Request, Response } from "express";
import httpStatus from "http-status";

import * as purchaseService from "@/services/client/purchase";
import PurchaseData from "@/interfaces/purchases";

export async function savePaymentInfo(req: Request, res: Response) {
  const purchaseData = req.body as PurchaseData;
  purchaseData.modalityId = req.purchaseData.modalityId;
  purchaseData.accommodationId = req.purchaseData.accommodationId;
  purchaseData.enrollmentId = req.body.enrollmentId;

  //prettier-ignore
  if(purchaseData.modalityId !== 1 && purchaseData.modalityId !== 2 ) return res.sendStatus(httpStatus.BAD_REQUEST);
  //prettier-ignore
  if(purchaseData.accommodationId !== 1 && purchaseData.accommodationId !== 2 ) return res.sendStatus(httpStatus.BAD_REQUEST);

  await purchaseService.createNewPurchase(purchaseData);
  res.sendStatus(httpStatus.OK);
}

export async function getPaymentInfo(req: Request, res: Response) {
  const purchaseData = req.body as PurchaseData;
  purchaseData.enrollmentId = req.body.enrollmentId;

  const purchaseInfo = await purchaseService.getPurchase(purchaseData.enrollmentId);

  if (!purchaseInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(purchaseInfo).status(httpStatus.OK);
}
