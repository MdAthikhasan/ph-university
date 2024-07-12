import academicDepartmentRoute from "../modules/academicDepartment/academicDepartment .route";
import academicFacultyRouter from "../modules/academicFaculty/academicFaculty.route";
import semesterRouter from "../modules/academicSemester/academicSevester.route";
import studentRoute from "../modules/student/student.routes";

import loginRouter from "../auth/auth.route";
import { Router } from "express";
import userRouter from "../modules/user/user.routes";
const router = Router();

const moduleRoutes = [
  {
    path: "/students",
    router: studentRoute,
  },
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "academic-semester",
    router: semesterRouter,
  },
  {
    path: "/academic-faculty",
    router: academicFacultyRouter,
  },
  {
    path: "/academic-department",
    router: academicDepartmentRoute,
  },
  {
    path: "/user",
    router: loginRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));
export default router;
