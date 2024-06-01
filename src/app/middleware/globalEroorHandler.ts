import { NextFunction, Request, Response } from "express";

export const globalEroorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let errMessage = err.message || "Something went wrong!";
  return res.status(statusCode).json({
    success: false,
    errMessage,
    err: err,
  });
};
