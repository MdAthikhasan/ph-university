import { Model, Schema, model } from "mongoose";
export interface Tuser {
  id: string;
  email:string;
  password: string;
  needPasswordChange: boolean;
  passwordChangedAt?:Date;
  role: string;
  status: string;
  isDeleted: boolean;
}

export interface UserModelInterface extends Model<Tuser> {
  isUserExistByCustomId(id: string): Promise<Tuser>;
  isPasswordMatched(
    plainPassword: string,
    hasedPassword: string
  ): Promise<Boolean>;
}
// interface IUser {
//   name: string;
// }

// interface UserModel extends Model<TUser> {
//   myStaticMethod(): number;
// }

// const schema = new Schema<IUser, UserModel>({
//   name: String,
//   myStaticMethod: Number,
// });
// schema.static("myStaticMethod", function myStaticMethod() {
//   return 42;
// });

// const User = model<IUser, UserModel>("User", schema);

// const answer: number = User.myStaticMethod();
