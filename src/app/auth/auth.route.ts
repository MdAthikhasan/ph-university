import { Router } from "express";
import {
  loginController,
  forgetPasswordController,
  refresController,
  changePassworeController,
  resetPasswordController
} from "./auth.controller";

const loginRouter = Router();

loginRouter.post("/login", loginController);
loginRouter.post("/refresh", refresController);
loginRouter.post("/change-password", changePassworeController);

loginRouter.post("/forget-password", forgetPasswordController);
loginRouter.post("/reset-password", resetPasswordController);
export default loginRouter;
