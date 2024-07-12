import httpStatus from "http-status";
import { asyncHeighrFn } from "../../utilities/asynHighFn";
import { sendResponse } from "../../utilities/sendResponse";
const getSingleAdmin = asyncHeighrFn(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleAdminFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Admin is retrieved succesfully",
    data: result,
  });
});

const getAllAdmins =  asyncHeighrFn(async (req, res) => {
  const result = await  getAllAdminsFromDB(req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Admins are retrieved succesfully",
    data: result,
  });
});

const updateAdmin = asyncHeighrFn(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await updateAdminIntoDB(id, admin);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Admin is updated succesfully",
    data: result,
  });
});

const deleteAdmin =  asyncHeighrFn(async (req, res) => {
  const { id } = req.params;
  const result = await  deleteAdminFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Admin is deleted succesfully",
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
