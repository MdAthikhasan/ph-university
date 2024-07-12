import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handlerCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  let statusCode = 500;
  let errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    statusCode,
    message: "Invalid id !",
    errorSources,
  };
};
export default handlerCastError;
