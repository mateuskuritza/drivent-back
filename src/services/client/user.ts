import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import User from "@/entities/User";

import CannotEnrollBeforeStartDateError from "@/errors/CannotEnrollBeforeStartDate";
import Setting from "@/entities/Setting";
import PasswordRecoveryToken from "@/entities/PasswordRecoveryToken";

export async function createNewUser(email: string, password: string) {
  const settings = await Setting.getEventSettings();

  if (dayjs().isBefore(dayjs(settings.startDate))) {
    throw new CannotEnrollBeforeStartDateError();
  }

  const user = await User.createNew(email, password);
  return user;
}

export async function findById(id: number) {
  const user = await User.findOne(id);
  return user;
}

export async function findByEmail(email: string) {
  const user = await User.findOne({ where: { email } });
  return user;
}

export async function createPasswordRecoveryLink(email: string) {
  const recoveryToken = jwt.sign(
    {
      userEmail: email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  const recoveryLink = `${process.env.FRONT_END_URL}/change-password?token=${recoveryToken}`;

  return recoveryLink;
}

export async function updateUserPassword(email: string, newPassword: string) {
  try {
    await User.updatePassword(email, newPassword);
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);
  }
}

export async function isValidPasswordRecoveryToken(email: string, recoveryToken: string) {
  try {
    const alreadyUsedToken = await PasswordRecoveryToken.fetchByValue(recoveryToken);

    if (!alreadyUsedToken) {
      await PasswordRecoveryToken.createNew(recoveryToken, email);
      return true;
    } else return false;
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);
  }
}
