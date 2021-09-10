import ModalityData from "@/interfaces/modality";
import NoVacancyAvailable from "@/errors/NoVacancyAvailable";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Purchase from "@/entities/Purchase";

@Entity("modalities")
export default class Modality extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  totalVacancy: number;

  @Column({ nullable: true })
  availableVacancy: number;

  @Column()
  price: number;

  @OneToMany(() => Purchase, purchase => purchase.modality)
  purchase: Purchase;

  static async getModalityInfo() {
    const modalities = await this.find();

    const getTotalVacancy = (name: string) => modalities.find(m => m.name === name).totalVacancy;
    const getAvailableVacancy = (name: string) => modalities.find(m => m.name === name).availableVacancy;
    const getPrice = (name: string) => modalities.find(m => m.name === name).price;

    return {
      presential: {
        total: getTotalVacancy("presential"),
        available: getAvailableVacancy("presential"),
        price: getPrice("presential"),
      },
      online: { total: getTotalVacancy("online"), available: getAvailableVacancy("online"), price: getPrice("online") },
    };
  }

  static async updateModalityInfo(data: ModalityData) {
    const modality = await this.findOne({ where: { id: data.modalityId } });

    if (modality && modality.availableVacancy === 0) {
      throw new NoVacancyAvailable();
    }

    if (modality && modality.availableVacancy > 0) {
      modality.availableVacancy -= 1;
    }

    await modality.save();
  }
}
