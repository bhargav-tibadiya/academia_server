// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Department from "@models/department.model";
import Institute from "@models/institute.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";

// Types & Constants
import { ServerResponse } from "@interfaces/controllers";
import { CreateDepartmentRequest, UpdateDepartmentRequest, DeleteDepartmentRequest } from "@interfaces/controllers/department.interface";

// Get All Departments & Get Department By ID
export const getDepartments: RequestHandler = async (req, res: ServerResponse) => {
  const { departmentId } = req.params;

  try {
    if (departmentId) {
      if (!mongoose.Types.ObjectId.isValid(departmentId)) {
        logger.warn(`Invalid ObjectId format: ${departmentId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return;
      }

      const department = await Department.findById(departmentId)
        .populate({
          path: "classes",
          select: "name"
        });
      if (!department) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${departmentId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched department: ${departmentId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, department));
      return;
    }

    const departments = await Department.find()
      .populate({
        path: "classes",
        select: "name"
      });

    logger.info("Fetched all departments");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, departments));
    return;
  } catch (error: any) {
    logger.error(`Error in getDepartments: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Create a Department
export const createDepartment: RequestHandler = async (req: CreateDepartmentRequest, res: ServerResponse) => {
  const departmentData = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(departmentData.instituteId)) {
      logger.warn(`Invalid Institute ObjectId format: ${departmentData.instituteId}`);
      res.status(STATUS.BAD_REQUEST).json(
        responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false)
      );
      return;
    }

    const institute = await Institute.findById(departmentData.instituteId);
    if (!institute) {
      logger.warn(`Institute not found: ${departmentData.instituteId}`);
      res.status(STATUS.NOT_FOUND).json(
        responseCreator(STATUS.NOT_FOUND, "Institute not found", false)
      );
      return;
    }

    const newDepartment = await Department.create(departmentData);

    await Institute.findByIdAndUpdate(
      departmentData.instituteId,
      { $push: { departments: newDepartment._id } },
      { new: true }
    );

    logger.info(`Created a new department: ${newDepartment._id}`);
    res.status(STATUS.CREATED).json(
      responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newDepartment)
    );
    return;
  } catch (error: any) {
    logger.error(`Error in createDepartment: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(
      responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false)
    );
    return;
  }
};

// Update a Department
export const updateDepartment: RequestHandler = async (req: UpdateDepartmentRequest, res: ServerResponse) => {
  const { departmentId } = req.params;
  const departmentData = req.body;

  if (!mongoose.Types.ObjectId.isValid(departmentId)) {
    logger.warn(`Invalid ObjectId format: ${departmentId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const updatedDepartment = await Department.findByIdAndUpdate(departmentId, departmentData, { new: true }).populate("classes");

    if (!updatedDepartment) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${departmentId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Updated department: ${departmentId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedDepartment));
    return;
  } catch (error: any) {
    logger.error(`Error in updateDepartment: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Delete a Department
export const deleteDepartment: RequestHandler<{ departmentId: string }> = async (req: DeleteDepartmentRequest, res: ServerResponse) => {
  const { departmentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(departmentId)) {
    logger.warn(`Invalid ObjectId format: ${departmentId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const institute = await Institute.findOne({ departments: departmentId });

    if (!institute) {
      logger.warn(`No institute found containing department: ${departmentId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, "No institute found containing this department", false));
      return;
    }

    await Institute.findByIdAndUpdate(
      institute._id,
      {
        $pull:
        {
          departments: departmentId
        }
      },
      {
        new: true
      }
    );

    const deletedDepartment = await Department.findByIdAndDelete(departmentId);

    if (!deletedDepartment) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${departmentId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted department: ${departmentId} and removed from institute: ${institute._id}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteDepartment: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};