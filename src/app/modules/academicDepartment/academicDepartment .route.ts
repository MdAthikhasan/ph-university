import { Router } from "express";
import {
  creatAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
} from "./academicDepartment.controller";
const academicDepartmentRoute = Router();

academicDepartmentRoute.post(
  "create-academic-department",
  creatAcademicDepartment
);

academicDepartmentRoute.get("/", getAllAcademicDepartment);

academicDepartmentRoute.get("/:departmentID", getSingleAcademicDepartment);

academicDepartmentRoute.put("/:departmentId", updateAcademicDepartment);

export default academicDepartmentRoute;
