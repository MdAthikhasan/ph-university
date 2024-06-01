"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insetStudentInDB = void 0;
const user_model_1 = require("./user.model");
const index_1 = __importDefault(require("../../config/index"));
const student_model_1 = require("../student/student.model");
const insetStudentInDB = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    let userData = {};
    // if password dont got
    userData.password = password || index_1.default.default_password;
    // set student role
    userData.role = "student";
    // set manually generated id
    userData.id = "202310001";
    let newUser = yield user_model_1.UserModel.create(userData);
    // create  a student
    if (Object.keys(newUser).length) {
        // set id , _id as a user
        studentData.id = newUser.id;
        studentData.user = newUser._id;
        const newStudent = yield student_model_1.StudentModel.create(studentData);
        return newStudent;
    }
});
exports.insetStudentInDB = insetStudentInDB;
