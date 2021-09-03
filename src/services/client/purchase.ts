import Purchase from "@/entities/Purchase";
import PurchaseData from "@/interfaces/purchases";

export async function getPurchase(userId: number) {
  const purchase = await Purchase.getByUserId(userId);

  return purchase;
}

export async function createNewPurchase(purchaseData: PurchaseData, userId: number) {
  await Purchase.createOrUpdatePayment(purchaseData, userId);
}
