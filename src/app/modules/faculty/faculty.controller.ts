import httpStatus from "http-status";
import { asyncHeighrFn } from "../../utilities/asynHighFn";
import { sendResponse } from "../../utilities/sendResponse";
import { Faculty } from "./facultay.model";

const getSingleFaculty = asyncHeighrFn(async (req, res) => {
  const { id } = req.params;
  const data = await Faculty.findById(id).populate("academicFaculty");

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "The faculty retrived from DB successfully",
    data: data,
  });
});

const getAllFaculties = asyncHeighrFn(async (req, res) => {
  const data = await Faculty.find().populate("academicFaculty");

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "  All faculty retrived from DB successfully",
    data: data,
  });
});

const updateFaculty = asyncHeighrFn(async (req, res) => {
  const { id } = req.params;
  const data = await Faculty.findByIdAndUpdate(id, req.body, {
    new: true,
  }).populate("academicFaculty");

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "The faculty  deleted from DB successfully",
    data: data,
  });
});
const deleteFaculty = asyncHeighrFn(async (req, res) => {
  const { id } = req.params;
  const data = await Faculty.findById(id).populate("academicFaculty");

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "The faculty  deleted from DB successfully",
    data: data,
  });
});

export { getSingleFaculty, getAllFaculties, deleteFaculty };
