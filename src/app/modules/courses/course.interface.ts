import { Types } from "mongoose";

export type TPreRequisitesCourse = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: string;
  credits: number;
  isDeleted: boolean;
  preRequisites: [TPreRequisitesCourse];
  createdAt: Date;
  updatedAt: Date;
};

export type TCourseFaculty = {
  course: Types.ObjectId;
  faculty: [Types.ObjectId];
};
