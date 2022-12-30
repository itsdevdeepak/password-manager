import { CustomError } from "./CustomError";

export default class AuthorizationError extends CustomError {
  __proto__ = Error;
  statusCode: number;
  constructor() {
    super("Unauthorized");
    this.statusCode = 401;
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }

  searializedError = () => ({
    message: this.message,
  });
}
