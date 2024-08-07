"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const currentDirectory = process.cwd();
const dotenv = require("dotenv");
const updatedPath = path.join(currentDirectory, ".env");
dotenv.config({ path: updatedPath });
exports.default = {
  port: process.env.PORT,
  database_url: process.env.MONGODB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_ROUND,
  default_password: process.env.DEFAULT_PASS,
  jwt_secret: process.env.JWT_SECRET,
};

// export default {
//   NODE_ENV: process.env.NODE_ENV,
//   port: process.env.PORT,
//   database_url: process.env.DATABASE_URL,
//   bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
//   default_password: process.env.DEFAULT_PASS,
//   jwt_secret: process.env.JWT_SECRET,
// };
