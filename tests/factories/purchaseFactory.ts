import Purchase from "../../src/entities/Purchase";
import PurchaseData from "../../src/interfaces/purchase";

export async function createPurchase(
  userId: number,
  modalityId: number,
  accommodationId: number,
  enrollmentId: number,
) {
  const purchaseData: PurchaseData = {
    userId,
    modalityId,
    accommodationId,
    enrollmentId,
  };

  await Purchase.createOrUpdate(purchaseData);

  const purchase = await Purchase.getByUserId(userId);
  return purchase;
}
