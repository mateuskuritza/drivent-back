import PurchaseData from "@/interfaces/purchase";

interface User {
  id: number;
}

declare namespace Express {
  export interface Request {
    adminId?: number;
    user?: User;
    purchaseData?: PurchaseData;
  }
}
