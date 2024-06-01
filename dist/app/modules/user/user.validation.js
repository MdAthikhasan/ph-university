"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userSchemaValidation = zod_1.z.object({
    id: zod_1.z.string(),
    password: zod_1.z
        .string({
        required_error: "name is required",
        invalid_type_error: "password must be string",
    })
        .max(30, { message: "password cant be more than 30" })
        .optional(),
    needPasswordChange: zod_1.z.boolean().optional().default(false),
    role: zod_1.z.enum(["admin", "student", "faculty"]),
    status: zod_1.z.enum(["in-progress", "blocked"]).default("in-progress"),
    isDeleted: zod_1.z.boolean().default(false),
});
exports.default = userSchemaValidation;
