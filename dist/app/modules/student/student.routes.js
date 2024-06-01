"use strict";
const { Router } = require("express");
const studentRoute = Router();
const { getAllStudent } = require("./student.controller");
studentRoute.get("student", getAllStudent);
studentRoute.get("student/:id", getStudent);
studentRoute.fetch("student/:id");
studentRoute.delet("student/:id");
module.exports = studentRoute;
