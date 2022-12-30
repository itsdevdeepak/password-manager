import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../errors/CustomError";
import { ServerError } from "../errors/ServerError";
import { ValidationError } from "../errors/ValidationError";

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).send({ errors: err.searializedError() });
    return;
  }

  res.status(err.statusCode).send({ error: err.searializedError() });
};

export const validationErrorHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array());
  }
  next();
};
