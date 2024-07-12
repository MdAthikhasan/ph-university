import { Schema, model } from "mongoose";
import { Tuser, UserModelInterface } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config/config";
const userSchema = new Schema<Tuser>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    email: { type: String, required: true },
    needPasswordChange: { type: Boolean, default: true },
    passwordChangedAt: {
      type: Date,
    },
    role: { type: String, enum: ["admin", "faculty", "student"] },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: { type: Boolean, default: false },
  },
  // timestamps is mongoose's default time set
  {
    timestamps: true,
  }
);
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await UserModel.findOne({ id }).select("+password");
};
// userSchema.statics.isPasswordMatched = async function (
//   plainPassword,
//   hasedPassword
// ) {
//   return
// };
// Hypothetical function to hash a password
const HypotheticalHasedFun = async (password: any) => {
  const saltRounds = config.bcrypt_salt_rounds;
  const hasedPassword = bcrypt.hash(password, Number(saltRounds) as number);
  return hasedPassword;
};

// userSchema.pre("save", async (next) => {
//   let user = this;
//   if (user.isModified("password")) {
//     user.password = await HypotheticalHasedFun(user.password);
//   }
//   next();
// });
export const UserModel = model<Tuser, UserModelInterface>(
  "UserModel",
  userSchema
);
