import Photo from "@/entities/Photo";
import LocalFile from "@/interfaces/localFile";
import S3File from "@/interfaces/s3File";

export async function updateUserPhoto(file: S3File & LocalFile, id: number) {
  return Photo.createOrUpdate(file, id);
}

export async function getPhotoByUserId(userId: number) {
  const photo = await Photo.find({ where: { userId } });
  return photo;
}
