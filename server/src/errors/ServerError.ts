import { CustomError } from "./CustomError";

export class ServerError extends CustomError {
  __proto__ = Error;
  statusCode: number;
  constructor() {
    super("Opps something went worng!");
    this.statusCode = 500;
    Object.setPrototypeOf(this, ServerError.prototype);
  }
  searializedError = () => {
    return {
      message: this.message,
    };
  };
}
