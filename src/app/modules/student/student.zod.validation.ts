import { z } from "zod";

const typeDefination = z.string().min(1, "This field is required");

const guardianSchema = z.object({
  firstName: typeDefination,
  lastName: typeDefination,
});

const studentSchemaValidaion = z.object({
  // id: z
  //   .string()
  //   .min(1, "Id is required")
  //   .refine((value) => value.trim() !== "", {
  //     message: "Id cannot be empty",
  //   }),
  user: z
    .string()
    .min(1, "User id must be required")
    .refine((value) => value.trim() !== "", {
      message: "User id cannot be empty",
    }),
  password: z.string().min(1, "Password is required").optional(),
  name: z.string().min(1, "Name is required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.number().min(1, "Date of birth is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  contact_num: z.number().min(1, "Contact number is required"),
  emergency_con: z.number().min(1, "Emergency contact is required"),
  presentAddress: z.string().min(1, "Present address is required"),
  PermanentAddress: z.string().min(1, "Permanent address is required"),
  academic_deparment: z.string().min(1, "Academic department is required"),
  guardian: guardianSchema.refine((value) => value !== undefined, {
    message: "Guardian info must be provided",
  }),
  localGuardian: guardianSchema.refine((value) => value !== undefined, {
    message: "Local guardian info must be provided",
  }),
  profile_image: z.string().min(1, "Profile image is required"),
  addmissionSemester: z.string().min(1, "Admission semester is required"),
  isDeleted: z.boolean().default(false),
});

export default studentSchemaValidaion;
