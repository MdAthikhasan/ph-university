import { z } from "zod";
import { TacademicSemester } from "./academicSemester.interface";
import {
  EnumMonths,
  academicSemesterCode,
  academicSemesterName,
} from "./academicSemester.const";

const zodValidationSemester = z.object({
  name: z.enum([...academicSemesterName] as [string, ...string[]]),
  year: z.string(),
  code: z.enum([...academicSemesterCode] as [string, ...string[]]),
  startMonth: z.enum([...EnumMonths] as [string, ...string[]]),
  endMonth: z.enum([...EnumMonths] as [string, ...string[]]),
});
export default zodValidationSemester;
