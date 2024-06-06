import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFields } from "./course.const";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course } from "./course.model";
import { AppError } from "../../error/AppError";
import httpStatus from "http-status";

export const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

export const assignFacultyCourseInDB = async (
  id: string,
  payload: TCourseFaculty
) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true }
  );
  return result;
};
export const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const searchQuery = new QueryBuilder(
    Course.find().populate("PreRequisitesCourseSchema.course"),
    query
  )
    .search(searchableFields)
    .filter()
    .paginate()
    .sort()
    .fields();
  const result = searchQuery.modelQuery;
  return result;
};

export const getSingleCoursesFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

// export const deleteCourseFromDB = async (id: string) => {
//   const result = await Course.findOneAndDelete(id);
//   return result;
// };
export const updateCourseIntoBD = async (
  id: string,
  payload: Partial<TCourse>
) => {
  const { PreRequisitesCourse, ...courseRemainingData } = payload;
  try {
    const session = mongoose.startSession();
    session.startTransaction();
    const updateBasicInfoData = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );
    if (!updateBasicInfoData) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to update ");
    }
    // checking if there is any prerequisite to update
    if (PreRequisitesCourse && PreRequisitesCourse.length > 0) {
      const deletedRreRequisite = PreRequisitesCourse.filter(
        (el) => el.course && el.isDeleted
      ).map((el) => el.course);
      const deletedRreRequisiteCourse = await Course.findOneAndUpdate(
        id,
        {
          $pull: {
            PreRequisitesCourse: { course: { $in: { deletedRreRequisite } } },
          },
        },
        { session, new: true }
      );
      if (!deletedRreRequisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, "Faild to update ");
      }
      const newPreRequisites = PreRequisitesCourse.filter(
        (el) => el.course && !el.isDeleted
      );
      const addedPreRequisites = await Course.findOneAndUpdate(
        id,
        {
          $addToSet: {
            PreRequisitesCourse: { $each: newPreRequisites },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );
      if (!addedPreRequisites) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "faild to update prerequisites"
        );
      }
      const result = await Course.findById({ id }).populate(
        "PreRequisitesCourse.course"
      );
      return result;
    }
    await session.commitTransaction();

    await session.abortTransaction();
    await session.endSession();
  } catch (error) {
    await (
      await session
    )
      .abortTransaction()(await session)
      .endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "catch block error");
  }
};

export const deletCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};
