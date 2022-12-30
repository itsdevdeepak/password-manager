import { Password } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import prisma from "../db";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";

export const createPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  try {
    const passwordRes = await prisma.password.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });
    res.send({ data: passwordRes });
  } catch (err) {
    console.log(err);

    next(new BadRequestError(406, "password already exist"));
  }
};

export const getPassword = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const password = await prisma.password.findUniqueOrThrow({
      where: {
        id: req.params.id,
      },
    });
    res.send({ data: password });
  } catch (err) {
    next(new NotFoundError());
  }
};

export const getAllPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const passwords = await prisma.password.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.send({ data: passwords });
  } catch (err) {
    next(new NotFoundError());
  }
};

export const updatePassword = async (
  req: Request<{ id: string }, {}, Password>,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  try {
    const password = await prisma.password.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...data,
      },
    });
    res.send({ data: password });
  } catch (err) {
    next(new BadRequestError(400, "Invalid data"));
  }
};

export const deletePassword = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const password = await prisma.password.delete({
      where: {
        id: req.params.id,
      },
    });
    res.send({ data: password });
  } catch (err) {
    next(new NotFoundError());
  }
};
