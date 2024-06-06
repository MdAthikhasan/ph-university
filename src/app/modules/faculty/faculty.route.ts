import express from "express";
import { deleteFaculty, getAllFaculties, getSingleFaculty } from "./faculty.controller";
const router = express.Router();

router.get("/:id", getSingleFaculty);
router.get("/", getAllFaculties);
router.patch(
  "/:id",

  updateFaculty
);

router.delete("/:id", deleteFaculty);

export const FacultyRoutes = router;
