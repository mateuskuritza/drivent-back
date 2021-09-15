import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import UnauthorizedError from "@/errors/Unauthorized";

interface JwtPayload {
  userEmail: string;
}

export function passwordRecoveryTokenValidationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = String(req.query.token);
    if (!token) throw new UnauthorizedError();

    const { userEmail } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    res.locals.email = userEmail;
    next();
  } catch {
    throw new UnauthorizedError();
  }
}
