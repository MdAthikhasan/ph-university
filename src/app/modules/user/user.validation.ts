import { z } from "zod";

const userSchemaValidation = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: "password must be string",
      })
      .max(30, { message: "password cant be more than 30" })
      .optional(),
  }),
});
export default userSchemaValidation;
