import httpStatus from "http-status";
import { asyncHeighrFn } from "../../utilities/asynHighFn";
import { sendResponse } from "../../utilities/sendResponse";

import { inserAcademicSemesterDB } from "./academicSemester.service";

export const semesterController = asyncHeighrFn(async (req, res, next) => {
  const { academicSemesterData } = req.body;

  const data = await inserAcademicSemesterDB(academicSemesterData);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "academicSemester data succesfully created",
    data: data,
  });
});
