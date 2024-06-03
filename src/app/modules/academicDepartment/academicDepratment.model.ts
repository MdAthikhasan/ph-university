import mongoose from "mongoose";
import { TacademicDepartment } from "./academicDepartment.interface";
import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
const { Schema, model } = mongoose;
const academicDepartmentSchema = new Schema<TacademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: "AcademicFaculty" },
  },
  {
    timestamps: true,
  }
);

export const AcademicDepartmentModel = model<TacademicDepartment>(
  "AcademicDepartmentModel",
  academicDepartmentSchema
);

academicDepartmentSchema.pre("save", async function (next) {
  const name = this.name;
  const isDepartmentExist = await AcademicDepartmentModel.findOne({ name });
  if (isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "The department is exits already "
    );
  }
  next();
});

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const isDepartmentExist = await AcademicDepartmentModel.findOne(
    this.getQuery()
  );
  if (!isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "The department is does not exist!"
    );
  }
  next();
});
