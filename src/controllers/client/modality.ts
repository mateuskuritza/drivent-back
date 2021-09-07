import { Request, Response } from "express";
import httpStatus from "http-status";

import * as modalityService from "@/services/client/modality";

export async function getModalityInfo(req: Request, res: Response) {
  const modalityInfo = await modalityService.getModalityInfo();

  if (!modalityInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(modalityInfo).status(httpStatus.OK);
}

export async function saveModalityInfo(req: Request, res: Response) {
  const body = req.body;
  await modalityService.updateModalityInfo(body);
  res.sendStatus(httpStatus.OK);
}
