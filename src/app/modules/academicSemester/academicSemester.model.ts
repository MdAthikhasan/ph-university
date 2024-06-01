import mongoose from "mongoose";
import { TacademicSemester } from "./academicSemester.interface";
const { Schema, model } = mongoose;
import {
  EnumMonths,
  academicSemesterCode,
  academicSemesterName,
} from "./academicSemester.const";
const academicSemesterSchema = new Schema<TacademicSemester>({
  name: {
    type: String,
    enum: academicSemesterName,
    requird: [true, "name is required"],
  },
  year: { type: String, required: [true, "year is required"] },
  code: {
    type: String,
    enum: academicSemesterCode,
    required: [true, "code is required"],
  },
  startMonth: { type: String, enum: EnumMonths },
  endMonth: { type: String, enum: EnumMonths },
});

academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExits = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExits) {
    throw new Error("Semester already exits");
  }
  next();
});

const AcademicSemesterModel = model<TacademicSemester>(
  "AcademicSemesterModel",
  academicSemesterSchema
);
export default AcademicSemesterModel;
