import httpStatus from "http-status";
import { AppError } from "../error/AppError";
import { UserModel } from "../modules/user/user.model";
import { TAuthUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config/config";
import { sendEmail } from "../utilities/sendEmail";
export const loginUser = async (payload: TAuthUser) => {
  // checking if the user is exist
  const user = await UserModel.isUserExistByCustomId(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "The user not found!");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "The user  already deleted!");
  }
  if (payload.password !== user?.password) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "password dont matchd");
  }
  if (user.status === "blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "The user  is blocked!");
  }
  /// checking if the password is correct
  // if (!(await UserModel.isPasswordMatched(payload.password, user.password))) {
  //   throw new AppError(
  //     httpStatus.FORBIDDEN,
  //     "The  password  is not   matched!"
  //   );
  // }

  let userPayload = {
    userId: user.id,
    role: user.role,
  };

  let accessToken = jwt.sign(userPayload, config.jwt_secret as string, {
    expiresIn: "10d",
  });
  let refreshToken = jwt.sign(userPayload, config.jwt_refresh as string, {
    expiresIn: "10d",
  });
  return { user, accessToken, refreshToken };
};

export const refresTokenService = async (token: string) => {
  const docoded = jwt.verify(token, config.jwt_refresh as string) as JwtPayload;

  const user = await UserModel.isUserExistByCustomId(docoded.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "The user not found!");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "The user  already deleted!");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "The user  is blocked!");
  }
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  } as JwtPayload;

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "20d",
  });
  return accessToken;
};
export const changePassworeService = async (
  payload: JwtPayload,
  passwordData: { oldPassword: string; newPassword: string }
) => {
  console.log(payload);
  const user = await UserModel.isUserExistByCustomId(payload.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "The user not found!");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "The user  already deleted!");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "The user  is blocked!");
  }

  if (passwordData.oldPassword !== user?.password)
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  await UserModel.findOneAndUpdate(
    { id: payload.userId, role: payload.role },
    {
      password: passwordData.newPassword,
      passwordChangedAt: new Date(),
    }
  );
  return null;
};

export const forgetPasswordService = async (id: string) => {
  const user = await UserModel.isUserExistByCustomId(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "The user not found!");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "The user  already deleted!");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "The user  is blocked!");
  }
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  } as JwtPayload;

  const resetToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "1h",
  });
  console.log(resetToken);
  const resetUILink = `http://localhost:3000?id=${user.id}&token=${resetToken}`;
  sendEmail(user.email, resetUILink);
  return resetUILink;
};

export const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  // checking if the user is exist
  const user = await UserModel.isUserExistByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;

  if (payload.id !== decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You are forbidden!");
  }

  await UserModel.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: payload.newPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );
  return null;
};
