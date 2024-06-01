import express from "express";
import { shenabahini } from "../../middleware/validationRequest";
import zodValidationSemester from "./academicSemester.validation";
import { semesterController } from "./academicSemester.controller";
const semesterRouter = express.Router();

semesterRouter.post(
  "/creat-academic-semester",
  shenabahini(zodValidationSemester),
  semesterController
);
export default semesterRouter;
