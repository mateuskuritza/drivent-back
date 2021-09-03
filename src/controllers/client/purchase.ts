import { Request, Response } from "express";
import httpStatus from "http-status";

import * as purchaseService from "@/services/client/purchase";
import PurchaseData from "@/interfaces/purchases";

export async function savePaymentInfo(req: Request, res: Response) {
  const purchaseData = req.body as PurchaseData;
  purchaseData.eventTicketId = req.purchaseData.eventTicketId;
  purchaseData.accommodationId = req.purchaseData.accommodationId;

  const userId = req.user.id;

  await purchaseService.createNewPurchase(purchaseData, userId);
  res.sendStatus(httpStatus.OK);
}

export async function getPaymentInfo(req: Request, res: Response) {
  const purchaseInfo = await purchaseService.getPurchase(req.user.id);

  if (!purchaseInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(purchaseInfo).status(httpStatus.OK);
}
