import { Router } from "express";
const studentRoute = Router();
import allRoute from "./student.controller";
studentRoute.post("/create-student", allRoute.createStudent);
studentRoute.get("/get-all", allRoute.getAllStudent);
studentRoute.get("/student/:password", allRoute.getSingleStudent);
studentRoute.put("/student/:id");
studentRoute.delete("/student/:id");

export default studentRoute;
