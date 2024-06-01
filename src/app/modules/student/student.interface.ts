import { Types } from "mongoose";

export interface Tstudent {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: string;
  gender: string;
  dateOfBirth: number;
  email: string;
  contact_num: number;
  emergency_con: number;
  presentAddress: string;
  PermanentAddress: string;
  academic_deparment: string;
  guardian: Tguardian;
  localGuardian: Tguardian;
  profile_image: string;
  addmissionSemester: string;
  isDeleted: boolean;
}

export interface Tguardian {
  firstName: string;
  lastName: string;
}
