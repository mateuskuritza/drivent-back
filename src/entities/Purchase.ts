import PurchaseData from "@/interfaces/purchase";
import Modality from "@/entities/Modality";
import Accommodation from "@/entities/Accommodation";
import Enrollment from "@/entities/Enrollment";
import User from "@/entities/User";

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";

@Entity("purchases")
export default class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enrollmentId: number;

  @Column()
  modalityId: number;

  @Column()
  accommodationId: number;

  @Column({ nullable: true })
  totalPrice: number;

  @Column({ type: "boolean", default: () => "FALSE" })
  paymentDone: boolean;

  @Column("timestamp with time zone", { nullable: false, default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  /*   @OneToOne(() => Accommodation)
  @JoinColumn()
  accommodation: Accommodation; */

  @ManyToOne(() => Accommodation, (accommodation: Accommodation) => accommodation.purchase, { eager: true })
  @JoinColumn()
  accommodation: Accommodation;

  /*  @OneToOne(() => Enrollment)
  @JoinColumn()
  enrollment: Enrollment;
 */
  @OneToOne(() => Enrollment, (enrollment: Enrollment) => enrollment.purchase, { eager: true })
  @JoinColumn()
  enrollment: Enrollment;

  @ManyToOne(() => Modality, (modality: Modality) => modality.purchase, { eager: true })
  @JoinColumn()
  modality: Modality;

  populateFromData(data: PurchaseData) {
    this.accommodationId = data.accommodationId;
    this.modalityId = data.modalityId;
  }

  static async getByEnrollmentId(id: number) {
    const purchase = await this.findOne({ where: { id: id } });
    return purchase;
  }

  static async createOrUpdatePayment(purchaseData: PurchaseData) {
    const user = await User.findOne({ where: { id: purchaseData.userId } });
    const enrollmentId = user.enrollment.id;

    let purchase = await this.getByEnrollmentId(enrollmentId);

    purchase ||= Purchase.create();
    purchase.populateFromData(purchaseData);

    let price = 10000;
    if (purchaseData.modalityId === 1) {
      price += 15000;
    }

    if (purchaseData.accommodationId === 2) {
      price += 35000;
    }

    purchase.enrollmentId = enrollmentId;
    purchase.totalPrice = price;

    await purchase.save();
  }
}
