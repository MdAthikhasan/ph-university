import { TacademicSemester } from "./academicSemester.interface";
import AcademicSemesterModel from "./academicSemester.model";

export const inserAcademicSemesterDB = async (
  academicSemesterData: TacademicSemester
) => {
  const academicSemesterCodeMapper: {
    Aotum: string;
    summer: string;
    fall: string;
  } = {
    Aotum: "01",
    summer: "02",
    fall: "03",
  };

  if (
    academicSemesterCodeMapper[academicSemesterData.name] !==
    academicSemesterData.code
  ) {
    throw new Error("invalid semester code");
  }
  const result = await AcademicSemesterModel.create(academicSemesterData);
  return result;
};
