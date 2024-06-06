import mongoose from "mongoose";
import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();
// const studentRoute = require("./modules/student/student.routes");

import userRouter from "./dist/app/modules/user/user.routes";
import globalEroorHandler from "./src//app/middleware/globalEroorHandler";
import notFoundHandler from "./src/app/middleware/notFound";
import semesterRouter from "./src/app/modules/academicSemester/academicSevester.route";
import academicFacultyRouter from "./src/app/modules/academicFaculty/academicFaculty.route";
import academicDepartmentRoute from "./src/app/modules/academicDepartment/academicDepartment .route";
//Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());
// Application level router
app.use("/api/v1/students", studentRoute);
app.use("/api/v1/users", userRouter);

const moduleRoute = [
  {
    path: "/api/v1/students",
    router: studentRoute,
  },
  {
    path: "/api/v1/users",
    router: userRouter,
  },
  {
    path: "/api/v1/academic-semester",
    router: semesterRouter,
  },
  {
    path: "/api/v1/academic-faculty",
    router: academicFacultyRouter,
  },
  {
    path: "/api/v1/academic-department",
    router: academicDepartmentRoute,
  },
];
moduleRoute.forEach((route) => app.use(route.path, route.router));
// connect with monogodb
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(`The application has  been connected to Mongodb `);
    app.listen(process.env.PORT, () => {
      console.log(`The app is listing ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

// global eroor handler whith middleware
app.use(globalEroorHandler);
// notFound  handler
app.use(notFoundHandler);
