import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/user";
import { updateUserPhoto } from "@/services/client/photo";

import { sendRecoveryEmail } from "@/mailers/nodemailer";
import InvalidDataError from "@/errors/InvalidData";
import S3File from "@/interfaces/s3File";
import LocalFile from "@/interfaces/localFile";

export async function signUp(req: Request, res: Response) {
  const user = await service.createNewUser(req.body.email, req.body.password);
  res.status(httpStatus.CREATED).send(user);
}

export async function resetPassword(req: Request, res: Response) {
  const user = await service.findByEmail(req.body.email);
  if (!user)
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({
        message: "Esse email não está cadastrado!",
      })
      .end();

  const recoveryLink = await service.createPasswordRecoveryLink(user.email);
  const mailTo = user.email;
  const data = { recoveryLink, mailTo };

  await sendRecoveryEmail(data);

  res.status(httpStatus.CREATED).end();
}

export async function changePassword(req: Request, res: Response) {
  const email: string = res.locals.email;
  const { password: newPassword } = req.body;

  await service.updateUserPassword(email, newPassword);

  res.status(httpStatus.OK).end();
}

export async function updatePhoto(req: Request, res: Response) {
  const file = req.file as unknown;
  if (!file) throw new InvalidDataError("Where is your photo?", ["Missing photo"]);
  const photo = await updateUserPhoto(file as S3File & LocalFile, req.user.id);
  return res.send(photo);
}
