import PurchaseData from "@/interfaces/purchase";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
      purchaseData?: PurchaseData;
      adminId?: number;
    }
  }
}

interface User {
  id: number;
}
