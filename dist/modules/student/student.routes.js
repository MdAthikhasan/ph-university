"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentRoute = (0, express_1.Router)();
const student_controller_1 = __importDefault(require("./student.controller"));
studentRoute.get("student", student_controller_1.default.getAllStudent);
studentRoute.get("student/:id", getStudent);
studentRoute.put("student/:id");
studentRoute.delete("student/:id");
exports.default = studentRoute;
