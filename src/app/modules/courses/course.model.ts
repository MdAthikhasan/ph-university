import { Schema, model, Types } from "mongoose";
import {
  TCourse,
  TCourseFaculty,
  TPreRequisitesCourse,
} from "./course.interface";

// Define the schema for preRequisitesCourse
const PreRequisitesCourseSchema = new Schema<TPreRequisitesCourse>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Define the schema for the course
const CourseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },

  preRequisites: [PreRequisitesCourseSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create models

export const Course = model<TCourse>("Course", CourseSchema);

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "course",
    unique: true,
  },
  faculty: [
    {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },
  ],
});
export const CourseFacultyModel = model<TCourseFaculty>(
  "CourseFacultyModel",
  courseFacultySchema
);
