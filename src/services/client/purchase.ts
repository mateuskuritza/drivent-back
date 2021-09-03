import Purchase from "@/entities/Purchase";

export async function getPayment(userId: number) {
  const purchase = await Purchase.getByUserId(userId);

  return purchase;
}
