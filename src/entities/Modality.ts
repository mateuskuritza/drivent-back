import ModalityData from "@/interfaces/modality";
import NoVacancyAvailable from "@/errors/NoVacancyAvailable";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import Ticket from "@/entities/Ticket";

@Entity("modalities")
export default class Modality extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  totalVacancy: number;

  @Column()
  availableVacancy: number;

  @Column()
  price: number;

  @OneToOne(() => Ticket, ticket => ticket.modality, { eager: true })
  ticket: Ticket;

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
    const modality = await this.findOne({ where: { name: data.modality } });

    if (modality.availableVacancy === 0) {
      throw new NoVacancyAvailable();
    }

    if (modality.availableVacancy > 0) {
      modality.availableVacancy -= 1;
    }
    await modality.save();
  }
}
