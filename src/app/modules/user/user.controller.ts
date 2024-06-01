import { RequestHandler, Request, Response } from "express";
import { insetStudentInDB } from "./user.service";
import { sendResponse } from "../../utilities/sendResponse";
import userSchemaValidation from "./user.validation";
import httpStatus from "http-status";
import { NextFunction } from "express-serve-static-core";
import { asyncHeighrFn } from "../../utilities/asynHighFn";
export const userController: RequestHandler = asyncHeighrFn(
  async (req, res, next) => {
    const { password, student: studentData } = req.body;
    // const zodParsedData = userSchemaValidation.parse(studentData);

    const data = await insetStudentInDB(password, studentData);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: "studetn succesfully created",
      data: data,
    });

    //
  }
);
