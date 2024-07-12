import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
const userRouter = express.Router();
import userSchemaValidation from "./user.validation";
import { shenabahini } from "../../middleware/validationRequest";
import { upload } from "../../multer/multer";
//army middlewareDef

// route defination
userRouter.post(
  "/create-student",
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  // shenabahini(userSchemaValidation),
  userController
);

export default userRouter;
