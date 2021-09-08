import PurchaseData from "@/interfaces/purchase";
import Purchase from "@/entities/Purchase";

export async function getPurchaseInfo(id: number) {
  return await Purchase.getPurchaseInfo(id);
}

export async function newPurchaseInfo(data: PurchaseData) {
  return await Purchase.newPurchaseInfo(data);
}
