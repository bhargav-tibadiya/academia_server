// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import TimeTable from "@models/timetable.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { ServerResponse } from "@interfaces/controllers";

// Get All TimeTables & Get TimeTable By ID
export const getTimeTables: RequestHandler = async (req, res: ServerResponse) => {
  const { timeTableId } = req.params;

  try {
    if (timeTableId) {
      if (!mongoose.Types.ObjectId.isValid(timeTableId)) {
        logger.warn(`Invalid ObjectId format: ${timeTableId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return;
      }

      const timeTable = await TimeTable.findById(timeTableId).populate("classId");
      if (!timeTable) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${timeTableId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched timetable: ${timeTableId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, timeTable));
      return;
    }

    const timeTables = await TimeTable.find().populate("classId");
    logger.info("Fetched all timetables");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, timeTables));
    return;
  } catch (error: any) {
    logger.error(`Error in getTimeTables: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Create a TimeTable
export const createTimeTable: RequestHandler = async (req, res: ServerResponse) => {
  const timeTableData = req.body;

  try {
    const newTimeTable = await TimeTable.create(timeTableData);
    logger.info(`Created a new timetable: ${newTimeTable._id}`);

    const populatedTimeTable = await TimeTable.findById(newTimeTable._id).populate("classId");
    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, populatedTimeTable ?? {}));
    return;
  } catch (error: any) {
    logger.error(`Error in createTimeTable: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update a TimeTable
export const updateTimeTable: RequestHandler = async (req, res: ServerResponse) => {
  const { timeTableId } = req.params;
  const timeTableData = req.body;

  if (!mongoose.Types.ObjectId.isValid(timeTableId)) {
    logger.warn(`Invalid ObjectId format: ${timeTableId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const updatedTimeTable = await TimeTable.findByIdAndUpdate(timeTableId, timeTableData, { new: true })
      .populate("classId");

    if (!updatedTimeTable) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${timeTableId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Updated timetable: ${timeTableId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedTimeTable));
    return;
  } catch (error: any) {
    logger.error(`Error in updateTimeTable: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Delete a TimeTable
export const deleteTimeTable: RequestHandler = async (req, res: ServerResponse) => {
  const { timeTableId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(timeTableId)) {
    logger.warn(`Invalid ObjectId format: ${timeTableId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const deletedTimeTable = await TimeTable.findByIdAndDelete(timeTableId);

    if (!deletedTimeTable) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${timeTableId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted timetable: ${timeTableId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteTimeTable: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
}; 