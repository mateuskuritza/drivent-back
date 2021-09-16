import { Request, Response, NextFunction } from "express";
import redis from "redis";
import { promisify } from "util";

import jwt from "jsonwebtoken";

import * as sessionService from "@/services/client/session";
import UnauthorizedError from "@/errors/Unauthorized";

interface JwtPayload {
  userId: number;
}

export default async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.header("Authorization");

    const token = authHeader?.replace("Bearer ", "");
    if (!token) {
      throw new UnauthorizedError();
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const client = redis.createClient();

    client.on("error", (error: string) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });

    const getAsync = promisify(client.get).bind(client);
    const setAsync = promisify(client.set).bind(client);

    const value = await getAsync("session" + userId);
    let userSession;

    if (value) {
      userSession = JSON.parse(value);
    } else {
      userSession = await sessionService.findSessionByToken(token);
      await setAsync("session" + userId, JSON.stringify(userSession));
    }

    if (userSession.token !== token) {
      throw new UnauthorizedError();
    }

    req.user = { id: userId };
    next();
  } catch (e) {
    throw new UnauthorizedError();
  }
}
