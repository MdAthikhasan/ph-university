import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
export const shenabahini = (shema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // if everything is right then we will go to controller this middleware for  validation
      await shema.parseAsync({
        body: req.body,
      });
    } catch (error) {
      next(error);
    }
  };
};
