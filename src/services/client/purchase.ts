import Purchase from "@/entities/Purchase";
import PurchaseData from "@/interfaces/purchase";

export async function getPurchase(userId: number) {
  const purchase = await Purchase.getByEnrollmentId(userId);
  return purchase;
}

export async function createNewPurchase(purchaseData: PurchaseData) {
  await Purchase.createOrUpdatePayment(purchaseData);
}
