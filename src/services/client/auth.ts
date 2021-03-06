import jwt from "jsonwebtoken";

import UnauthorizedError from "@/errors/Unauthorized";
import User from "@/entities/User";
import Session from "@/entities/Session";

export async function signIn(
  email: string,
  password: string,
): Promise<{ user: { id: number; email: string }; token: string }> {
  const user = await User.findByEmailAndPassword(email, password);

  if (!user) {
    throw new UnauthorizedError();
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const session = await Session.createNew(user.id, token);

  return {
    user: {
      id: user.id,
      email: user.email,
    },

    token,
  };
}
