import httpStatus from "http-status";
import { sendResponse } from "../utilities/sendResponse";
import { asyncHeighrFn } from "../utilities/asynHighFn";
import {
  changePassworeService,
  forgetPasswordService,
  loginUser,
  refresTokenService,
  resetPassword,
} from "./auth.service";
import { AppError } from "../error/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
export const loginController = asyncHeighrFn(async (req, res) => {
  const result = await loginUser(req.body);
  const { accessToken, refreshToken } = result;
  res.cookie("refreshtoken", refreshToken, {
    httpOnly: true,
  });
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "login successfully!",
    data: { accessToken },
  });
});
export const refresController = asyncHeighrFn(async (req, res) => {
  const cookiee = req.cookies;

  const accessToken = await refresTokenService(cookiee.refreshtoken);
  console.log("hi", accessToken);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "accesstoken retrived successfully!",
    data: {
      accessToken,
    },
  });
});
export const changePassworeController = asyncHeighrFn(async (req, res) => {
  const token = req.headers.authorization;

  const { passwordData } = req.body;
  console.log(passwordData);
  if (!token) {
    new AppError(httpStatus.NOT_FOUND, "token not found ");
  }
  const docoded = jwt.verify(
    token as string,
    config.jwt_secret as string
  ) as JwtPayload;
  const result = await changePassworeService(docoded, passwordData);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "password changed successfully!",
    data: result,
  });
});
export const forgetPasswordController = asyncHeighrFn(async (req, res) => {
  const result = await forgetPasswordService(req.body.id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Reset link generetaed  successfully!",
    data: result,
  });
});

export const resetPasswordController = asyncHeighrFn(async (req, res) => {
  const token = req.headers.authorization;
  const userData = req.body;
  const result = await resetPassword(userData, token!);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "  Password reset  successfully!",
    data: result,
  });
});
