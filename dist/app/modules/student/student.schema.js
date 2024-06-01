"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { Schema } = mongoose;
const typeDefination = { type: String, required: true };
const guardianSchema = new Schema({
    firstName: typeDefination,
    lastName: typeDefination,
});
const studentSchema = new Schema({
    id: { type: String, required: [true, "Id is required"], unique: true },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, "userid must required"],
        unique: true,
        ref: "user",
    },
    password: { type: String, required: true },
    Name: { type: String, required: true },
    Gender: { type: String, required: true },
    Dateofbirth: { type: Number, required: true },
    Email: { type: String, required: true },
    Contactno: { type: Number, required: true },
    Emergencycon: { type: Number, required: true },
    Presentaddress: { type: String, required: true },
    Permanentaddress: { type: String, required: true },
    Academic_deparment: { type: String, required: true },
    Guardian: { type: guardianSchema, required: [true, "guardian info must"] },
    Localguardian: {
        type: guardianSchema,
        required: [true, "localguardian info must"],
    },
    Profile_image: { type: String, required: true },
    idDeleted: { type: Boolean, required: true },
});
module.exports = studentSchema;
