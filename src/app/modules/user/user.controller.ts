import { RequestHandler, Request, Response } from "express";
import { insetStudentInDB } from "./user.service";
import { sendResponse } from "../../utilities/sendResponse";
import userSchemaValidation from "./user.validation";
import httpStatus from "http-status";
import { NextFunction } from "express-serve-static-core";
import { asyncHeighrFn } from "../../utilities/asynHighFn";
import { AppError } from "../../error/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config/config";
import { copyFile } from "fs";
import StudentModel from "../student/student.model";
export const userController: RequestHandler = asyncHeighrFn(
  async (req, res, next) => {
    const { studentData, password } = req.body;
    let token = req.headers.authorization;
    const file = req.file?.path;
    console.log("fileath", file);
    if (!token) {
      new AppError(httpStatus.NOT_FOUND, "token not found");
    }

    token = token?.split(" ")[1];
    const decoded = jwt.verify(
      token as string,
      config.jwt_secret as string
    ) as JwtPayload;
    const user = await StudentModel.findOne({ id: decoded.userId as string });
    if (!user) {
      sendResponse(res, {
        status: 400,
        success: true,
        message: "student not found",
        data: null,
      });
    }
    // const zodParsedData = userSchemaValidation.parse(studentData);

    const data = await insetStudentInDB(password, studentData, file);
    sendResponse(res, {
      status: 200,
      success: true,
      message: "student succesfully created",
      data: data,
    });

    //
  }
);
