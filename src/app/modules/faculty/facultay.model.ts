import mongoose from "mongoose";
import { FacultyModel, TFaculty, TUserName } from "./faculty.interface";
import { BloodGroup, Gender } from "./faculty.constance";

const { Schema, model } = mongoose;

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required"],
    maxlength: [20, "Name can not be more than 20 characters"],
  },
  middleName: { type: String },
  lastName: {
    type: String,
    trim: true,
    required: [true, " Last name is required"],
    maxlength: [20, "Name can not be more than 20 characters"],
  },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: { type: String, required: [true, "Id is required"], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: "User",
      unique: true,
    },
    designation: { type: String, required: [true, "Designation is required"] },
    name: {
      type: userNameSchema,
      required: [true, "Name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: Date,
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, " ContactNo is required"],
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      required: [true, " ContactNo is required"],
      unique: true,
    },
    bloogGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: "{VALUE} is not a valid bloodgroup",
      },
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, " permanent address is required"],
    },
    profileImg: String,
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "User",
    },
    isDeleted: { type: Boolean, default: false },
  },

  {
    toJSON: { virtuals: true },
  }
);

// generetting fullname
facultySchema.virtual("fullName").get(function () {
  return (
    this?.name?.firstName +
    "" +
    this?.name?.middleName +
    "" +
    this?.name?.lastName
  );
});

// filterout deleted document
facultySchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

facultySchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Faculty.find({ id });
  return existingUser;
};
export const Faculty = model<TFaculty, FacultyModel>("Faculty", facultySchema);
