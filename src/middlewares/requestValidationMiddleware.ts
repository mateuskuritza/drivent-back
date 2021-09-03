import InvalidDataError from "@/errors/InvalidData";
import { Request, Response, NextFunction } from "express";
import PurchaseData from "@/interfaces/purchases";

export default async function requestValidationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const eventTicketId: number = req.body.eventTicketId;
    const accommodationId: number = req.body.accommodationId;

    req.purchaseData = {
      eventTicketId,
      accommodationId,
    } as PurchaseData;
    next();
  } catch (e) {
    throw new InvalidDataError("Purchase Data", []);
  }
}
