import { TAcademicSemesterCode, TMonth } from "./academicSemester.const";
import { TAcademicSemesterName } from "./academicSemester.const";
export type TacademicSemester = {
  name: TAcademicSemesterName;
  year: string;
  code: TAcademicSemesterCode;
  startMonth: TMonth;
  endMonth: TMonth;
};

// type Tobj = {
//   width: string;
//   height: string;
// };
// const obj: Tobj = {
//   width: "athik",
//   height: "ch",
// };

// type TobjN = {
//   [key in keyof Tobj]: number;
//   // [width:string,height:string] :number
// };

// const a: TobjN = {
//   width: 45,
//   height: 46,
// };
