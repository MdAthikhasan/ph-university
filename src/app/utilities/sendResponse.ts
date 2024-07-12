import { Response } from "express";

type TResponse<T> = {
  status: number;
  success: boolean;
  message: string;
  data: T;
};
export const sendResponse = (res: Response, data: TResponse<any>) => {
  res.status(data.status).json({
    status: data.status,
    success: data.success,
    message: data.message,
    data: data.data,
  });
};
