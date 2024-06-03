import { TacademicFaculty } from "./academicFaculty.interface";
import { AcademicFacultyModel } from "./academicFaculty.model";

export const createAcademicFacultyIntoDB = async (
  payload: TacademicFaculty
) => {
  const data = await AcademicFacultyModel.create(payload);
  return data;
};
