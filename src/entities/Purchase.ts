import CannotPurchaseAgainError from "@/errors/CannotPurchaseAgain";
import PurchaseData from "@/interfaces/purchases";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Accommodation from "./Accommodation";
import Ticket from "./Ticket";
import User from "./User";

@Entity("purchases")
export default class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accommodationId: number;

  @Column()
  userId: number;

  @Column()
  ticketId: number;

  @OneToOne(() => Ticket)
  @JoinColumn()
  ticket: Ticket;

  @OneToOne(() => Accommodation)
  @JoinColumn()
  accommodation: Accommodation;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  populateFromData(data: PurchaseData, userId: number) {
    this.accommodationId = data.accommodationId;
    this.userId = userId;
    this.ticketId = data.eventTicketId;
  }

  static async getByUserId(userId: number) {
    return await this.findOne({ where: { userId } });
  }

  static async createOrUpdatePayment(purchaseData: PurchaseData, userId: number) {
    let purchase = await this.getByUserId(userId);

    if (purchase && purchase.userId === userId) {
      throw new CannotPurchaseAgainError();
    }

    purchase ||= Purchase.create();
    purchase.populateFromData(purchaseData, userId);
    await purchase.save();
  }
}
