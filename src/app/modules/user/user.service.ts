import { Tstudent } from "../student/student.interface";
import { UserModel } from "./user.model";
import config from "../../config/config";
import { Tuser } from "./user.interface";
import StudentModel from "../student/student.model";
export const insetStudentInDB = async (
  password: any,
  studentData: Tstudent
) => {
  // create a user object
  let userData: Partial<Tuser> = {};
  // if password dont got
  userData.password = password || config.default_password;
  // set student role
  userData.role = "student";
  // set manually generated id

  userData.id = "202310001";
  let newUser = await UserModel.create(userData);
  // create  a student
  if (Object.keys(newUser).length) {
    // set id , _id as a user
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};
