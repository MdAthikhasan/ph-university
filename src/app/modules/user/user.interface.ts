export type Tuser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
};

import { Model, Schema, model } from "mongoose";

interface IUser {
  name: string;
}

interface UserModel extends Model<IUser> {
  myStaticMethod(): number;
}

const schema = new Schema<IUser, UserModel>({
  name: String,
  myStaticMethod: Number,
});
schema.static("myStaticMethod", function myStaticMethod() {
  return 42;
});

const User = model<IUser, UserModel>("User", schema);

const answer: number = User.myStaticMethod();
