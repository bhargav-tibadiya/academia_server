// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Class from "@models/class.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { ServerResponse } from "@interfaces/controllers";

// Get All Classes & Get Class By ID
export const getClasses: RequestHandler = async (req, res: ServerResponse) => {
  const { classId } = req.params;

  try {
    if (classId) {
      if (!mongoose.Types.ObjectId.isValid(classId)) {
        logger.warn(`Invalid ObjectId format: ${classId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return;
      }

      const classData = await Class.findById(classId).populate("students").populate("timeTableId").populate("exams").populate("updates");
      if (!classData) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${classId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched class record: ${classId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, classData));
      return;
    }

    const classes = await Class.find().populate("students").populate("timeTableId").populate("exams").populate("updates");
    logger.info("Fetched all class records");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, classes));
    return;
  } catch (error: any) {
    logger.error(`Error in getClasses: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Create a Class Record
export const createClass: RequestHandler = async (req, res: ServerResponse) => {
  const { name, students, timeTableId, exams, updates } = req.body;

  try {
    const newClass = new Class({ name, students, timeTableId, exams, updates });
    await newClass.save();
    logger.info("Created a new class record");

    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newClass));
    return;
  } catch (error: any) {
    logger.error(`Error in createClass: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update a Class Record
export const updateClass: RequestHandler = async (req, res: ServerResponse) => {
  const { classId } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(classId)) {
    logger.warn(`Invalid ObjectId format: ${classId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const updatedClass = await Class.findByIdAndUpdate(classId, updateData, { new: true });

    if (!updatedClass) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${classId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Updated class record: ${classId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedClass));
    return;
  } catch (error: any) {
    logger.error(`Error in updateClass: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Delete a Class Record
export const deleteClass: RequestHandler = async (req, res: ServerResponse) => {
  const { classId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(classId)) {
    logger.warn(`Invalid ObjectId format: ${classId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const deletedClass = await Class.findByIdAndDelete(classId);

    if (!deletedClass) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${classId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted class record: ${classId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteClass: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};
