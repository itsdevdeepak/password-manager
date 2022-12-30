import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
  __proto__ = Error;
  statusCode: number;
  constructor() {
    super("Not Found!");
    this.statusCode = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  searializedError = () => {
    return {
      message: this.message,
    };
  };
}
