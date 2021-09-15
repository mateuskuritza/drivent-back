import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import bcrypt from "bcrypt";
import EmailNotAvailableError from "@/errors/EmailNotAvailable";
import Room from "./Room";
import Purchase from "./Purchase";
import Enrollment from "@/entities/Enrollment";
import Photo from "./Photo";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToOne(() => Room)
  room: Room;

  @OneToOne(() => Purchase)
  purchase: Purchase;

  @OneToOne(() => Enrollment, enrollment => enrollment.user, { eager: true })
  enrollment: Enrollment;

  @OneToOne(() => Photo, photo => photo.user, { eager: true })
  @JoinColumn()
  photo: Photo;

  @Column({ default: null })
  photoId: number;

  static async createNew(email: string, password: string) {
    await this.validateDuplicateEmail(email);
    const hashedPassword = this.hashPassword(password);

    const newUser = this.create({ email, password: hashedPassword });
    await newUser.save();

    return newUser;
  }

  static hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  static async validateDuplicateEmail(email: string) {
    const user = await this.findOne({ email });

    if (user) {
      throw new EmailNotAvailableError(email);
    }
  }

  static async findByEmailAndPassword(email: string, password: string) {
    const user = await this.findOne({ where: { email } });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }
}
