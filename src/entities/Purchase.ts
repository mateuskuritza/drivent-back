import CannotPurchaseAgainError from "@/errors/CannotPurchaseAgain";
import PurchaseData from "@/interfaces/purchases";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Accommodation from "./Accommodation";
import Enrollment from "./Enrollment";

@Entity("purchases")
export default class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accommodationId: number;

  @Column()
  enrollmentId: number;

  @Column()
  modalityId: number;

  @Column({ nullable: true })
  totalPrice: number;

  @Column("boolean", { default: false })
  paymentDone: boolean;

  @Column("timestamp with time zone", { nullable: false, default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToOne(() => Accommodation)
  @JoinColumn()
  accommodation: Accommodation;

  @OneToOne(() => Enrollment)
  @JoinColumn()
  enrollment: Enrollment;

  populateFromData(data: PurchaseData) {
    this.accommodationId = data.accommodationId;
    this.enrollmentId = data.enrollmentId;
    this.modalityId = data.modalityId;
  }

  static async getByEnrollmentId(enrollmentId: number) {
    return await this.findOne({ where: { enrollmentId } });
  }

  static async createOrUpdatePayment(purchaseData: PurchaseData) {
    let purchase = await this.getByEnrollmentId(purchaseData.enrollmentId);

    if (purchase && purchase.enrollmentId === purchaseData.enrollmentId) {
      throw new CannotPurchaseAgainError();
    }

    purchase ||= Purchase.create();
    purchase.populateFromData(purchaseData);
    await purchase.save();
  }
}
