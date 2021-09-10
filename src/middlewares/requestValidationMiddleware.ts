import InvalidDataError from "@/errors/InvalidData";
import { Request, Response, NextFunction } from "express";
import PurchaseData from "@/interfaces/purchase";

export default async function requestValidationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const modalityId: number = req.body.modalityId;
    const accommodationId: number = req.body.accommodationId;
    const userId: number = req.body.userId;

    req.purchaseData = {
      userId,
      modalityId,
      accommodationId,
    } as PurchaseData;
    next();
  } catch (e) {
    throw new InvalidDataError("Purchase Data", []);
  }
}
