"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { model } = mongoose_1.default;
const student_schema_1 = __importDefault(require("./student.schema"));
exports.StudentModel = model("StudentModel", student_schema_1.default);
// const resul t =   StudentModel.create({
//   // id: "1",
//   // Name: "John Doe",
//   // Gender: "Male",
//   // Dateofbirth: 19900101,
//   // Email: "john.doe@example.com",
//   // Contactno: 1234567890,
//   // Emergencycon: 5987654321,
//   // Presentaddress: "123 Main St",
//   // Permanentaddress: "123 Main St",
//   // Academic_deparment: "Computer Science",
//   // Guardian: { firstName: "Jane", lastName: "Doe" },
//   // Localguardian: { firstName: "Jim", lastName: "Beam" },
//   // Profile_image: "profile.jpg",
//   // idDeleted: false,
// });
// export default result;
