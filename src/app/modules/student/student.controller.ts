import { Request, Response, NextFunction } from "express";
import StudentModel from "./student.model";
import QueryBuilder from "../../builder/QueryBuilder";
const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const searchQuery = new QueryBuilder(StudentModel.find(), req.query)
      .search(["email", "name.firstName"])
      .filter()
      .sort()
      .paginate()
      .fields();

    // {email:{$regex:{searchTerm}}}

    // let queryObj = { ...req.query }; // copying req.query object so that we can mutate the copy object
    // let searchTerm = "";
    // if (queryObj.searchTerm) {
    //   searchTerm = queryObj.searchTerm as string;
    // }
    // const searchQuery = StudentModel.find({
    //   $or: ["email", "name.firstName"].map((field) => {
    //     return {
    //       [field]: { $regex: { searchTerm, $options: "i" } },
    //     };
    //   }),
    // });
    // let exclueds = ["searchTerm", "sort", "limit", "page", "fields"];
    // exclueds.forEach((el) => delete queryObj[el]);
    // const filterQuery = await searchQuery.find(queryObj);

    // let sort = "-createdAt";

    // if (req.query.sort) {
    //   sort = req.query.sort as string;
    // }

    // const sortQuery = filterQuery.sort(sort);

    // // limit query
    // let page = 1;
    // let limit = 1;
    // let skip = 1;

    // if (req.query.limit) {
    //   limit = Number(req.query.limit);
    // }
    // if (req.query.page) {
    //   page = Number(req.query.page);
    //   skip = (page - 1) * limit;
    // }

    // const paginateQuery = sortQuery.skip(skip);
    // const limitQuery = paginateQuery.limit(limit);

    // let fields = "-__v"; // SET DEFAULT VALUE
    // if (req.query.fields) {
    //   fields = (req.query.fields as string).split(",").join(" ");
    // }

    // const filedsQuery = await limitQuery.select(fields);

    res.json({
      success: true,
      message: "all student data got from mongodb",
      data: searchQuery.modelQuery,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentParam = req.params.password;
    const getSingleStudentFromDb = await StudentModel.findOne({
      password: studentParam,
    });
    if (!getSingleStudentFromDb) {
      return;
    }
    res.json({
      success: true,
      message: " single student data got from mongodb",
      data: getSingleStudentFromDb,
    });
  } catch (error) {
    next(error);
  }
};
export default {
  getAllStudent,
  getSingleStudent,
};
