import { EntityManager, getConnection } from "typeorm";
import CpfNotAvailableError from "@/errors/CpfNotAvailable";
import EnrollmentData from "@/interfaces/enrollment";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Address from "@/entities/Address";
import Purchase from "@/entities/Purchase";
import User from "@/entities/User";

@Entity("enrollments")
export default class Enrollment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  birthday: string;

  @Column()
  phone: string;

  @Column()
  userId: number;

  @Column({ nullable: true })
  purchaseId: number;

  @OneToOne(() => Address, address => address.enrollment, { eager: true })
  address: Address;

  @OneToOne(() => Purchase, purchase => purchase.enrollment)
  purchase: Purchase;

  @OneToOne(() => User, (user: User) => user.enrollment)
  @JoinColumn()
  user: User;

  populateFromData(data: EnrollmentData) {
    this.name = data.name;
    this.cpf = data.cpf;
    this.birthday = data.birthday;
    this.phone = data.phone;
    this.userId = data.userId;

    this.address ||= Address.create();
    const { address } = this;

    address.cep = data.address.cep;
    address.street = data.address.street;
    address.city = data.address.city;
    address.number = data.address.number;
    address.state = data.address.state;
    address.neighborhood = data.address.neighborhood;
    address.addressDetail = data.address.addressDetail;
  }

  static async createOrUpdate(data: EnrollmentData) {
    let enrollment = await this.findOne({ where: { cpf: data.cpf } });

    if (enrollment && enrollment.userId !== data.userId) {
      throw new CpfNotAvailableError(data.cpf);
    }

    enrollment ||= Enrollment.create();
    enrollment.populateFromData(data);

    await getConnection().transaction(async (manager: EntityManager) => {
      try {
        await manager.save(Enrollment, enrollment);

        enrollment.address.enrollmentId = enrollment.id;
        await manager.save(Address, enrollment.address);
      } catch (err) {
        /* eslint-disable-next-line no-console */
        console.error(err);
      }
    });
  }

  static async getByUserIdWithAddress(userId: number) {
    return await this.findOne({ where: { userId } });
  }
}
