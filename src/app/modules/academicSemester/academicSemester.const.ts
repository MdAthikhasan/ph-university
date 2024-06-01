 

export type TMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export const EnumMonths: TMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type TAcademicSemesterName = "Autumn" | "Summer" | "Fall"; // string leteral type
export const academicSemesterName: TAcademicSemesterName[] = [
    "Autumn",
    "Summer",
    "Fall",
  ];
export type TAcademicSemesterCode = "01" | "02" | "03";

export const academicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];
