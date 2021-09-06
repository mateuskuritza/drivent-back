import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, AfterLoad } from "typeorm";
import Room from "./Room";

@Entity("hotels")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  size: number;

  @Column({ default: null })
  vacancies: number;

  @OneToMany(() => Room, room => room.hotel)
  @JoinColumn()
  rooms: Room[];

  static async getHotels() {
    const hotels = await this.find();
    return Promise.all(hotels.map( async (hotel) => {
      const newHotel = hotel;
      newHotel.vacancies = await this.getVacancies(String(hotel.id));
      return newHotel;
    }));
  }

  static async getRooms(id: string) {
    const hotel = await this.findOne({ where: { id }, relations: ["rooms"] });
    const rooms = hotel.rooms;
    return rooms.sort( (first, second) => first.id - second.id);
  }

  static async getVacancies(id: string) {
    const rooms = await this.getRooms(id);
    let vacancies = 0;
    rooms.forEach( room => vacancies += room.available);
    return vacancies;
  }
}
