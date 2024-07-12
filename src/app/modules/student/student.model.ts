import mongoose from "mongoose";
const { Schema, model } = mongoose;

import { Tguardian, Tstudent } from "./student.interface";
const typeDefination = { type: String, required: true };
const guardianSchema = new Schema({
  firstName: typeDefination,
  lastName: typeDefination,
});
const studentSchema = new Schema<Tstudent>({
  id: { type: String, required: [true, "Id is required"] },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User id must required"],
    ref: "user",
  },
  name: { type: String, required: true },
  gender: { type: String, required: [true, "gender is required"] },
  dateOfBirth: { type: Number, required: true },
  email: { type: String, required: true },
  contact_num: { type: Number, required: true },
  emergency_con: { type: Number, required: true },
  presentAddress: { type: String, required: true },
  PermanentAddress: { type: String, required: true },
  academic_deparment: { type: String, required: true },
  guardian: { type: guardianSchema, required: [true, "guardian info must"] },
  localGuardian: {
    type: guardianSchema,
    required: [true, "localguardian info must"],
  },
  profile_image: { type: String, required: true },
  addmissionSemester: { type: String, required: true },
  isDeleted: { type: Boolean, required: true, default: false },
});
const StudentModel = model("Student", studentSchema);
export default StudentModel;
