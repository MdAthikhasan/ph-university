import httpStatus from "http-status";
import { asyncHeighrFn } from "../../utilities/asynHighFn";
import { sendResponse } from "../../utilities/sendResponse";
import { createAcademicFacultyIntoDB } from "./academic.service";

export const creatAcademicFaculty = asyncHeighrFn(async (req, res) => {
  const { facultyName } = req.body;

  const result = await createAcademicFacultyIntoDB(facultyName);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Academic faculty created successfully!",
    data: result,
  });
});
