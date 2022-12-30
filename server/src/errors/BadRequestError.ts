import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError {
  __proto__ = Error;
  statusCode = 400;
  constructor(statusCode?: number, message?: string) {
    super(message ? message : "Bad Request");
    this.statusCode = statusCode ? statusCode : this.statusCode;
  }
  searializedError = () => ({
    message: this.message,
  });
}
