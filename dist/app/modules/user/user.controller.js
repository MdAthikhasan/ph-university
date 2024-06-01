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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const userController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, student: studentData } = req.body;
    // const zodParsedData = userSchemaValidation.parse(studentData);
    try {
        const data = yield (0, user_service_1.insetStudentInDB)(password, studentData);
        res.status(500).json({
            success: true,
            message: "studetn succesfully created",
            date: data,
        });
    }
    catch (error) {
        res.status(400).json({
            scucces: false,
            message: error.message || "somthing went wrong",
            error: error,
        });
    }
    //
});
exports.userController = userController;
