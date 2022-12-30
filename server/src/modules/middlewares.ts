import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";
import { ServerError } from "../errors/ServerError";

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (!(err instanceof CustomError)) {
    throw new ServerError();
  }

  // Todo: handle array of errors for validation-error

  res.status(err.statusCode).send({ error: err.searializedError() });
};
