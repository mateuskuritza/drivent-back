import PurchaseData from "@/interfaces/purchases";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
      purchaseData?: PurchaseData;
    }
  }
}

interface User {
  id: number;
}
