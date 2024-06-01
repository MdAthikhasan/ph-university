import { Router } from "express";
const studentRoute = Router();
import allRoute from "./student.controller";
studentRoute.get("student", allRoute.getAllStudent);
studentRoute.get("student/:password", allRoute.getSingleStudent);
studentRoute.put("student/:id");
studentRoute.delete("student/:id");

export default studentRoute;
