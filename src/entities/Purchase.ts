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

  @Column()
  totalPrice: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "boolean", default: () => "FALSE" })
  paymentDone: boolean;

  @OneToOne(() => Enrollment, (enrollment: Enrollment) => enrollment.purchase, { eager: true })
  @JoinColumn()
  enrollment: Enrollment;

  @ManyToOne(() => Modality, (modality: Modality) => modality.purchase, { eager: true })
  @JoinColumn()
  modality: Modality;

  @ManyToOne(() => Accommodation, (accommodation: Accommodation) => accommodation.purchase, { eager: true })
  @JoinColumn()
  accommodation: Accommodation;

  static async getPurchaseInfo(id: number) {
    const purchase = await this.findOne({ where: { id: id } });
    return { purchase };
  }

  static async newPurchaseInfo(data: PurchaseData) {
    let price = 10000;
    const modalityId = data.modality === "presential" ? 1 : 2;
    if (modalityId === 1) {
      price += 15000;
    }
    const accommodationId = data.accommodation === "withHotel" ? 2 : 1;
    if (accommodationId === 2) {
      price += 35000;
    }

    const user = await User.findOne({ where: { id: data.userId } });
    const enrollmentId = user.enrollment.id;

    const newPurchase = this.create({
      enrollmentId: enrollmentId,
      modalityId: modalityId,
      accommodationId: accommodationId,
      totalPrice: price,
    });
    await newPurchase.save();
  }
}
