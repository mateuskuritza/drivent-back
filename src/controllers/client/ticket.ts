import { Request, Response } from "express";
import httpStatus from "http-status";

import * as ticketService from "@/services/client/ticket";
import * as modalityService from "@/services/client/modality";

export async function getTicketInfo(req: Request, res: Response) {
  const ticketInfo = await ticketService.getTicketInfo();

  if (!ticketInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(ticketInfo).status(httpStatus.OK);
}

export async function saveTicketInfo(req: Request, res: Response) {
  const body = req.body;
  await modalityService.updateModalityInfo(body);
  await ticketService.newTicketInfo(body);
  res.sendStatus(httpStatus.OK);
}
