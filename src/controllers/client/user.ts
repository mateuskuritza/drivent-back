import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/user";
import { sendRecoveryEmail } from "@/mailers/nodemailer";

export async function signUp(req: Request, res: Response) {
  const user = await service.createNewUser(req.body.email, req.body.password);
  res.status(httpStatus.CREATED).send(user);
}

export async function resetPassword(req: Request, res: Response) {
  const user = await service.findByEmail(req.body.email);
  if (!user)
    return res
      .status(httpStatus.NOT_FOUND)
      .json({
        text: "Email não cadastrado!",
      })
      .end();

  const recoveryLink = await service.createPasswordRecoveryLink(user.email);
  const mailTo = user.email;
  const data = { recoveryLink, mailTo };

  sendRecoveryEmail(data);

  res.status(httpStatus.CREATED).end();
}

export async function changePassword(req: Request, res: Response) {
  const email: string = res.locals.email;
  const { password: newPassword } = req.body;

  await service.updateUserPassword(email, newPassword);

  res.status(httpStatus.OK).end();
}
