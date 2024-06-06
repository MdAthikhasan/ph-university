import { Router } from "express";
import {
  assignFacultyCourse,
  creatCourse,
  deleteCourse,
  getAllCourse,
  getSingleCourse,
} from "./course.controller";
const router = Router();

router.post("create-course", creatCourse);
router.get("/", getAllCourse);
router.get("/:id", getSingleCourse);
router.put("/courseId", assignFacultyCourse);
router.delete("/:id", deleteCourse);

export const courseRoutes = router;
