import httpStatus from "http-status";
import { asyncHeighrFn } from "../../utilities/asynHighFn";
import { sendResponse } from "../../utilities/sendResponse";
import {
  createCourseIntoDB,
  deletCourseFromDB,
  getAllCoursesFromDB,
  getSingleCoursesFromDB,
  updateCourseIntoBD,
  assignFacultyCourseInDB,
} from "./course.service";

export const creatCourse = asyncHeighrFn(async (req, res) => {
  const { course } = req.body;

  const result = await createCourseIntoDB(course);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Course created successfully!",
    data: result,
  });
});

export const getAllCourse = asyncHeighrFn(async (req, res) => {
  const result = await getAllCoursesFromDB(req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Course retridev from db successfully!",
    data: result,
  });
});

export const getSingleCourse = asyncHeighrFn(async (req, res) => {
  const result = await getSingleCoursesFromDB(req.params.id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Course retridev from db successfully!",
    data: result,
  });
});

export const assignFacultyCourse = asyncHeighrFn(async (req, res) => {
  const result = await assignFacultyCourseInDB(req.params.courseId, req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "course faculty created  successfully!",
    data: result,
  });
});

export const deleteCourse = asyncHeighrFn(async (req, res) => {
  const result = await deletCourseFromDB(req.params.id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Course deleted from db successfully!",
    data: result,
  });
});

export const updateCourse = asyncHeighrFn(async (req, res) => {
  const result = await updateCourseIntoBD(req.params.id, req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Course  updated   successfully!",
    data: result,
  });
});
