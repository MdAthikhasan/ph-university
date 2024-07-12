import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../error/zodErrorHandle";
import { TErrorSources } from "../interface/error";
import handleValidationError from "../error/handleValidationError";
import handlerCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handlerDuplicateError";
import { AppError } from "../error/AppError";

export const globalEroorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let errMessage = "Something went wrong!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong !",
    },
  ];

  if (err instanceof ZodError) {
    let simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    errMessage = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    console.log(statusCode);
    errMessage = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err.name === "CastError") {
    const simplifiedError = handlerCastError(err);
    statusCode = simplifiedError?.statusCode;
    errMessage = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    errMessage = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    (statusCode = err.statusCode),
      (errMessage = err.message),
      (errorSources = [
        {
          path: "",
          message: err.message,
        },
      ]);
  } else if (err instanceof Error) {
    errMessage = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    errMessage,
    errorSources,
    err,
    stack: "development" === "development" ? err?.stack : null,
  });
};
