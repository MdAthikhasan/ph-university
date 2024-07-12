import express, { Application } from "express";
import cookieParser from "cookie-parser";
const app: Application = express();
import cors from "cors";
import rootRoute from "./app/routes/indext";
//Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());
// cookie parser
app.use(cookieParser());
// Application level router
app.use("/api/v1", rootRoute);

export default app;
