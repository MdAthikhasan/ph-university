import joi from "joi";
import { Tstudent } from "./student.interface";

export const schema = joi.object<Tstudent>({
  name: joi.string().min(3).max(30).required(),
  // .message({ string.min: "The minimum length is 3 characters"}),
  gender: joi.string().min(1).required(),
  dateOfBirth: joi.string().required(),
  email: joi.string().email().required(),
  contact_num: joi.number(),
  emergency_con: joi.number(),
  presentAddress: joi.string().required(),
  PermanentAddress: joi.string().required(),
  academic_deparment: joi.string().required(),
  guardian: joi
    .object({
      firstName: joi.string(),
      lastName: joi.string(),
    })
    .required(),
  localGuardian: joi
    .object({
      firstName: joi.string(),
      lastName: joi.string(),
    })
    .required(),
  profile_image: joi.string().required(),
  addmissionSemester: joi.string(),
  isDeleted: joi.boolean(),
});
