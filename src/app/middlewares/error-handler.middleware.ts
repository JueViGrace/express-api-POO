import { CustomError } from "../models/custom-error.model";
import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError("Unexpected error occurred", 500);
  }

  res.status((customError as CustomError).status).send(customError);
};

export default errorHandler;
