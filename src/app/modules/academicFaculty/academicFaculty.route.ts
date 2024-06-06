import { Router } from "express";
import { creatAcademicFaculty } from "./academicFaculty.controller";
const academicFacultyRouter = Router();

academicFacultyRouter.post("creat-academic-faculty", creatAcademicFaculty);
export default academicFacultyRouter;
