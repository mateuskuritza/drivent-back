import Purchase from "@/entities/Purchase";
import PurchaseData from "@/interfaces/purchase";
import Enrollment from "@/entities/Enrollment";

export async function getPurchase(userId: number) {
  const enrollment = await Enrollment.findOne({ where: { userId: userId } });

  let enrollmentId;

  if (enrollment) {
    enrollmentId = enrollment.id;
  } else {
    enrollmentId = 0;
  }
  const purchase = await Purchase.getByEnrollmentId(enrollmentId);
  return { purchase };
}

export async function createNewPurchase(purchaseData: PurchaseData) {
  const enrollment = await Enrollment.findOne({ where: { userId: purchaseData.userId } });

  let enrollmentId;

  if (enrollment) {
    enrollmentId = enrollment.id;
  } else {
    enrollmentId = 0;
  }

  await Purchase.createOrUpdate(purchaseData, enrollmentId);
}

export async function getEnrollmentWithAddress(userId: number) {
  return await Enrollment.getByUserIdWithAddress(userId);
}
