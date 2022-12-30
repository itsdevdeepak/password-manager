import { User } from "@prisma/client";
import e, { NextFunction, Request, Response } from "express";
import prisma from "../db";
import { BadRequestError } from "../errors/BadRequestError";
import { compairePassword, createToken, hashPassword } from "../modules/auth";

export const createUser = async (
  req: Request<{}, {}, { name: string; email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  let user: User;
  try {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
      },
    });
  } catch (err) {
    next(new BadRequestError(409, "User already exist"));
    return;
  }

  try {
    const token = createToken(user);
    res.send({ token: token });
  } catch (err) {
    next(new BadRequestError());
    return;
  }
};

export const signIn = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  let user: User;
  try {
    user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
  } catch (err) {
    next(new BadRequestError(400, "user not exist"));
    return;
  }
  if (!(await compairePassword(password, user.password))) {
    next(new BadRequestError(400, "Invalid data"));
    return;
  }

  const token = createToken(user);

  res.send({ token: token });
};
