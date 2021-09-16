import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, In } from "typeorm";

@Entity("passwordRecoveryTokens")
export default class PasswordRecoveryToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  value: string;

  @Column()
  email: string;

  @Column("bigint")
  usedAt: number;

  static async fetchByValue(value: string) {
    const token = await this.findOne({ where: { value } });
    return token || "";
  }

  static async createNew(value: string, email: string) {
    const newToken = this.create();

    newToken.value = value;
    newToken.email = email;
    newToken.usedAt = new Date().getTime(); //timestamp in ms

    await newToken.save();
  }

  static async removeAllExpired() {
    const allTokens = await this.find();
    const currentTime = new Date().getTime();

    //return an array containing the ids of all tokens used within more than 1 hour.
    const expiredTokensId = allTokens
      .filter(t => {
        if (currentTime - t.usedAt >= 3_600_000) return t;
      })
      .map(t => t.id);
    //deletes all rows with id value present in given array.
    await this.delete({ id: In(expiredTokensId) });
  }
}
