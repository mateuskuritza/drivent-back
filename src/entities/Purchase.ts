import PurchaseData from "@/interfaces/purchase";
import Modality from "@/entities/Modality";
import Accommodation from "@/entities/Accommodation";

import Enrollment from "@/entities/Enrollment";

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import User from "./User";

@Entity("purchases")
export default class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enrollmentId: number;

  @Column()
  userId: number;

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

  @OneToOne(() => Enrollment, (enrollment: Enrollment) => enrollment.purchase, { eager: true })
  @JoinColumn()
  enrollment: Enrollment;

  @ManyToOne(() => Accommodation, (accommodation: Accommodation) => accommodation.purchase, { eager: true })
  @JoinColumn()
  accommodation: Accommodation;

  @ManyToOne(() => Modality, (modality: Modality) => modality.purchase, { eager: true })
  @JoinColumn()
  modality: Modality;

  @ManyToOne(() => User, (user: User) => user.purchase)
  @JoinColumn()
  user: User;

  populateFromData(data: PurchaseData) {
    this.accommodationId = data.accommodationId;
    this.enrollmentId = data.enrollmentId;
    this.modalityId = data.modalityId;
    this.userId = data.userId;
    this.paymentDone = data.paymentDone || false;
  }

  static async getByUserId(userId: number) {
    const purchase = await this.findOne({ where: { userId: userId } });

    return purchase;
  }

  static async createOrUpdate(purchaseData: PurchaseData) {
    let purchase = await this.getByUserId(purchaseData.userId);

    purchase ||= Purchase.create();
    purchase.populateFromData(purchaseData);

    let price = 10000;
    if (purchaseData.modalityId === 1) {
      price += 15000;
    }

    if (purchaseData.accommodationId === 2) {
      price += 35000;
    }

    purchase.totalPrice = price;

    await purchase.save();
  }
}
