import { Request, Response, NextFunction } from "express";
import StudentModel from "./student.model";
const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allStudentFromDb = await StudentModel.find();
    if (!allStudentFromDb) {
      return;
    }
    res.json({
      success: true,
      message: "all student data got from mongodb",
      data: allStudentFromDb,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentParam = req.params.password;
    const getSingleStudentFromDb = await StudentModel.findOne({
      password: studentParam,
    });
    if (!getSingleStudentFromDb) {
      return;
    }
    res.json({
      success: true,
      message: " single student data got from mongodb",
      data: getSingleStudentFromDb,
    });
  } catch (error) {
    next(error);
  }
};
export default {
  getAllStudent,
  getSingleStudent,
};
