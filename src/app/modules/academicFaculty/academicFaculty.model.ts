import mongoose from "mongoose";
import { TacademicFaculty } from "./academicFaculty.interface";
const { Schema, model } = mongoose;

const academicFacultySchema = new Schema<TacademicFaculty>({
  name: { type: String, required: true, unique: true },
});

export const AcademicFacultyModel = model<TacademicFaculty>(
  "AcademicFacultyModel",
  academicFacultySchema
);
