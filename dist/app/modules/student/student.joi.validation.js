"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const joi = require("joi");
exports.schema = joi.object({
    name: joi
        .string()
        .min(3, { message: "athik min limit no hoie" })
        .max(30)
        .required(),
    gender: joi.string().min(1).required(),
    Dateofbirth: joi.string().required(),
    Email: joi.string().email().required(),
    Contactno: joi.number(),
    Emergencycon: joi.number(),
    Presentaddress: joi.string().required(),
    Permanentaddress: joi.string().required(),
    Academic_deparment: joi.string().required(),
    Guardian: joi
        .object({
        firstName: joi.string(),
        lastName: joi.string(),
    })
        .required(),
    Localguardian: joi
        .string(joi.object({
        firstName: joi.string(),
        lastName: joi.string(),
    }))
        .required(),
    Profile_image: joi.string().required(),
    idDeleted: joi.bollean(),
});
