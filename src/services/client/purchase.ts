import Purchase from "@/entities/Purchase";

export async function getPurchase(userId: number) {
  const purchase = await Purchase.getByUserId(userId);

  return purchase;
}
