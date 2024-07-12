import { Request, Response, NextFunction } from "express";
import StudentModel from "./student.model";
import QueryBuilder from "../../builder/QueryBuilder";
import httpStatus from "http-status";

const createStudent = async (req: Request, res: Response) => {
  const result = await StudentModel.create(req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: "student created succesfully",
    data: result,
  });
};
const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryCopy = { ...req.query };
    const query = { email: { $regex: req.query.searchTerm, $options: "i" } };
    const searchQuery = StudentModel.find(query);

    delete queryCopy.searchTerm;
    delete queryCopy.select;
    delete queryCopy.limit;
    delete queryCopy.page;
    console.log(req.query);
    // const filterQuery = searchQuery.find(queryCopy);

    const a = (Number(req.query.page) - 1) * Number(req.query.limit);

    const skitFields = searchQuery.skip(a);
    const limitQuery = skitFields.limit(req.query.limit as unknown as number);
    const selecFields = await limitQuery.select(req.query.select as string);

    // const searchQuery = new QueryBuilder(StudentModel.find(), req.query)
    //   .search(["email", "name.firstName"])
    //   .filter()
    //   .sort()
    //   .paginate()
    //   .fields();

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

    res.status(httpStatus.OK).json({
      success: true,
      message: "all student data got from mongodb",
      data: selecFields,
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
  createStudent,
  getAllStudent,
  getSingleStudent,
};
