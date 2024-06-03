import httpStatus from "http-status";
import { asyncHeighrFn } from "../../utilities/asynHighFn";
import { sendResponse } from "../../utilities/sendResponse";
import { AcademicDepartmentModel } from "./academicDepratment.model";

const creatAcademicDepartment = asyncHeighrFn(async (req, res) => {
  const data = await AcademicDepartmentModel.create(req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "The academicdepartment  created successfully",
    data: data,
  });
});

const getAllAcademicDepartment = asyncHeighrFn(async (req, res) => {
  const data = await AcademicDepartmentModel.find().populate("AcademicFaculty");
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "The academicdepartment all data retrived successfully",
    data: data,
  });
});
const getSingleAcademicDepartment = asyncHeighrFn(async (req, res) => {
  const { departmentID } = req.params;
  const data = await AcademicDepartmentModel.find({ departmentID }).populate(
    "AcademicFaculty"
  );
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "The academicdepartment  single data retrived successfully",
    data: data,
  });
});

const updateAcademicDepartment = asyncHeighrFn(async (req, res) => {
  const { departmentID } = req.params;
  const data = await AcademicDepartmentModel.findOneAndUpdate(
    {
      departmentID,
    },
    req.body,
    { new: true }
  );
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "The academicdepartment  single data retrived successfully",
    data: data,
  });
});

export {
  creatAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
