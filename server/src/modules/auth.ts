import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import config from "../config";
import { NextFunction, Request, Response } from "express";
import AuthorizationError from "../errors/AuthorizationError";

declare module "express-serve-static-core" {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 8);
};

export const compairePassword = async (
  password: string,
  hashPassword: string
) => {
  return await bcrypt.compare(password, hashPassword);
};

export const createToken = ({ id, email }: User) => {
  const token = jwt.sign(
    {
      id,
      email,
    },
    config.secret.jwt
  );

  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    next(new AuthorizationError());
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    next(new AuthorizationError());
    return;
  }

  try {
    const payload = jwt.verify(token, config.secret.jwt);
    req.user = payload as User;
    next();
  } catch (e) {
    next(new AuthorizationError());
  }
};
