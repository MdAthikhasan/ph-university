import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
const userRouter = express.Router();
import userSchemaValidation from "./user.validation";
import { shenabahini } from "../../middleware/validationRequest";
//army middlewareDef

// route defination
userRouter.post(
  "/create-student",
  shenabahini(userSchemaValidation),
  userController
);

export default userRouter;
