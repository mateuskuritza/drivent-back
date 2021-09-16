import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import * as userService from "@/services/client/user";
import ExpiredPasswordRecoveryToken from "@/errors/ExpiredPasswordRecoveryToken";

interface JwtPayload {
  userEmail: string;
}

export async function passwordRecoveryTokenValidationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = String(req.query.token);
    if (!token) throw new ExpiredPasswordRecoveryToken();

    const { userEmail } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const isValidToken = await userService.isValidPasswordRecoveryToken(userEmail, token);
    if (!isValidToken) throw new ExpiredPasswordRecoveryToken();

    res.locals.email = userEmail;
    next();
  } catch {
    throw new ExpiredPasswordRecoveryToken();
  }
}
