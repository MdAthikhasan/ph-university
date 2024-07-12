import { Tstudent } from "../student/student.interface";
import { UserModel } from "./user.model";
import config from "../../config/config";
import { Tuser } from "./user.interface";
import StudentModel from "../student/student.model";
import mongoose from "mongoose";
import { sendImageToCloudinary } from "../../multer/multer";
export const insetStudentInDB = async (
  password: string,
  studentData: Tstudent,
  file
) => {
  // create a user object
  let userData: Partial<Tuser> = {};
  // if password dont got
  userData.password = password || config.default_password;
  // set student role
  userData.role = "student";
  // set manually generated id
  // set email
  userData.email = "ttatweik2@gmail.com";
  userData.id = "56784353";
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // transaction one
    sendImageToCloudinary(file);
    let newUser = await UserModel.create([userData], { session }); // arr
    // create  a student
    if (newUser.length) {
      // set id , _id as a user

      studentData.id = newUser[0].id; // embedding
      studentData.user = newUser[0]._id; // referencing
      // transaction tow
      const newStudent = await StudentModel.create(studentData);
      await session.commitTransaction();
      await session.endSession();
      return newStudent;
    }
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
