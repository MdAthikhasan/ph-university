const path = require("path");
const currentDirectory = process.cwd();
const dotenv = require("dotenv");
const updatedPath = path.join(currentDirectory, ".env");
dotenv.config({ path: updatedPath });

export default {
  port: process.env.PORT,
  database_url: process.env.MONGODB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_ROUND,
  default_password :process.env.DEFAULT_PASS
};
