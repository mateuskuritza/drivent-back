import { Request, Response } from "express";
import httpStatus from "http-status";

import * as purchaseService from "@/services/client/purchase";
import * as modalityService from "@/services/client/modality";

export async function getPurchaseInfo(req: Request, res: Response) {
  const { id } = req.params;
  const purchaseInfo = await purchaseService.getPurchaseInfo(Number(id));

  if (!purchaseInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(purchaseInfo).status(httpStatus.OK);
}

export async function savePurchaseInfo(req: Request, res: Response) {
  const body = req.body;

  await modalityService.updateModalityInfo(body);
  await purchaseService.newPurchaseInfo(body);
  res.sendStatus(httpStatus.OK);
}
