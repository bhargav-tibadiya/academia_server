// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Department from "@models/department.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { ServerResponse } from "@interfaces/controllers";

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

      const department = await Department.findById(departmentId).populate("classes");
      if (!department) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${departmentId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched department: ${departmentId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, department));
      return;
    }

    const departments = await Department.find().populate("classes");
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
export const createDepartment: RequestHandler = async (req, res: ServerResponse) => {
  const departmentData = req.body;

  try {
    const newDepartment = await Department.create(departmentData);
    logger.info(`Created a new department: ${newDepartment._id}`);

    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newDepartment));
    return;
  } catch (error: any) {
    logger.error(`Error in createDepartment: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update a Department
export const updateDepartment: RequestHandler = async (req, res: ServerResponse) => {
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
export const deleteDepartment: RequestHandler = async (req, res: ServerResponse) => {
  const { departmentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(departmentId)) {
    logger.warn(`Invalid ObjectId format: ${departmentId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const deletedDepartment = await Department.findByIdAndDelete(departmentId);

    if (!deletedDepartment) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${departmentId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted department: ${departmentId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteDepartment: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
}; 