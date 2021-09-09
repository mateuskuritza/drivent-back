import Purchase from "@/entities/Purchase";
import PurchaseData from "@/interfaces/purchases";

export async function getPurchase(enrollmentId: number) {
  const purchase = await Purchase.getByEnrollmentId(enrollmentId);
  return purchase;
}

export async function createNewPurchase(purchaseData: PurchaseData) {
  await Purchase.createOrUpdatePayment(purchaseData);
}
