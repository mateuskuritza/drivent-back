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

  @OneToOne(() => User, user => user.photo, { cascade: true })
  user: User;

  @Column({ default: null })
  userId: number;

  static async createOrUpdate(file: LocalFile & S3File, userId: number) {
    let photo = await this.findOne({ userId });

    photo ||= this.create();
    photo.userId = userId;

    const isLocalStorage = !!file.path;
    const newPhoto = this.populateFromData(photo, isLocalStorage, file);

    return newPhoto.save();
  }

  static populateFromData(photo: Photo, isLocalStorage: boolean, file: LocalFile & S3File) {
    photo.name = file.originalname;
    photo.size = file.size;
    if (isLocalStorage) {
      photo.key = file.filename;
      photo.url = `${process.env.APP_URL}/files/${file.filename}`;
    } else {
      photo.key = file.key;
      photo.url = file.location;
    }
    return photo;
  }
}
