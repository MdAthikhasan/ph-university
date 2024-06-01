import { z } from "zod";

const userSchemaValidation = z.object({
  body: z.object({
    id: z.string(),
    password: z
      .string({
        required_error: "name is required",
        invalid_type_error: "password must be string",
      })
      .max(30, { message: "password cant be more than 30" })
      .optional(),
    needPasswordChange: z.boolean().optional().default(false),
    role: z.enum(["admin", "student", "faculty"]),
    status: z.enum(["in-progress", "blocked"]).default("in-progress"),
    isDeleted: z.boolean().default(false),
  }),
});
export default userSchemaValidation;
