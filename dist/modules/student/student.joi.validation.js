"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30).required(),
    gender: joi_1.default.string().min(1).required(),
    Dateofbirth: joi_1.default.string().required(),
    Email: joi_1.default.string().email().required(),
    Contactno: joi_1.default.number(),
    Emergencycon: joi_1.default.number(),
    Presentaddress: joi_1.default.string().required(),
    Permanentaddress: joi_1.default.string().required(),
    Academic_deparment: joi_1.default.string().required(),
    Guardian: joi_1.default
        .object({
        firstName: joi_1.default.string(),
        lastName: joi_1.default.string(),
    })
        .required(),
    Localguardian: joi_1.default
        .object({
        firstName: joi_1.default.string(),
        lastName: joi_1.default.string(),
    })
        .required(),
    Profile_image: joi_1.default.string().required(),
    idDeleted: joi_1.default.boolean(),
});
