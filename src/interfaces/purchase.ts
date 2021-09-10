interface PurchaseData {
  userId: number;
  modalityId: number;
  accommodationId: number;
  enrollmentId?: number;
  paymentDone?: boolean;
}

export default PurchaseData;
