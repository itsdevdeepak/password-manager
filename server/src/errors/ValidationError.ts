import { CustomError } from "./CustomError";
import { ValidationError as Err } from "express-validator";
export class ValidationError extends CustomError {
  __proto__ = Error;
  errors: Err[];
  statusCode: number;
  constructor(errors: Err[]) {
    super("Validation Error");
    this.statusCode = 406;
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
  searializedError = () =>
    this.errors.map((err) => ({ message: err.msg, prams: err.param }));
}
