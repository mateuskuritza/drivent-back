import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import User from "./User";
import LocalFile from "@/interfaces/localFile";
import S3File from "@/interfaces/s3File";

@Entity("photos")
export default class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ default: null })
  url: string;

  @Column({ default: null })
  key: string;

  @OneToOne(() => User, { cascade: true })
  user: User;

  @Column()
  userId: number;

  static async createOrUpdate(file: LocalFile & S3File, id: number) {
    const { originalname, size, filename, path, key, location } = file;

    let photo = (await this.find({ where: { userId: id } }))[0];

    photo ||= this.create();

    const user = await User.findOne(id);

    photo.name = originalname;
    photo.size = size;
    photo.userId = user.id;

    const isLocalStorage = !!path;

    if (isLocalStorage) {
      photo.key = filename;
      photo.url = `${process.env.APP_URL}/files/${filename}`;
    } else {
      photo.key = key;
      photo.url = location;
    }

    return photo.save();
  }
}
