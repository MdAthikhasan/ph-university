import z from "zod";
export const academicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be string!",
      required_error: "Name is required!",
    }),
  }),
});
