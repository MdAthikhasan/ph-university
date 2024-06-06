import { z } from "zod";
import { TCourse } from "./course.interface";

const preRequisiteCourseValidation = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});
export const coursevalidationSchema = z.object<TCourse>({
  body: z.object({
    tile: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourse: z.array(preRequisiteCourseValidation).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updatePreRequisiteCourseValidation = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});
export const updateCoursevalidationSchema = z.object<TCourse>({
  body: z.object({
    tile: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourse: z.array(updatePreRequisiteCourseValidation).optional(),
    isDeleted: z.boolean().optional(),
  }),
});
