type customErrorType = {
  message: string;
  additional?: string;
};

export abstract class CustomError extends Error {
  __proto__ = Error;
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract searializedError: () => customErrorType | customErrorType[];
}
