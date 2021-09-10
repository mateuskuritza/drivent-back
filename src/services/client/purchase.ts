import Purchase from "@/entities/Purchase";
import PurchaseData from "@/interfaces/purchase";
import Enrollment from "@/entities/Enrollment";

export async function getPurchase(userId: number) {
  const purchase = await Purchase.getByUserId(userId);

  return { purchase };
}

export async function createNewPurchase(purchaseData: PurchaseData) {
  const enrollment = await Enrollment.findOne({ where: { userId: purchaseData.userId } });

  purchaseData.enrollmentId = enrollment.id;

  await Purchase.createOrUpdate(purchaseData);
}

export async function updatePurchase(purchaseData: PurchaseData) {
  await Purchase.createOrUpdate(purchaseData);
}

export async function getEnrollmentWithAddress(userId: number) {
  return await Enrollment.getByUserIdWithAddress(userId);
}
