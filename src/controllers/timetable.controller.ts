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
<<<<<<< HEAD
export const getTimeTables: RequestHandler = async (
  req,
  res: ServerResponse
) => {
  const { timetableId } = req.params;
  try {
    if (timetableId) {
      if (!mongoose.Types.ObjectId.isValid(timetableId)) {
        logger.warn(`Invalid ObjectId format: ${timetableId}`);
        res
          .status(STATUS.BAD_REQUEST)
          .json(
            responseCreator(
              STATUS.BAD_REQUEST,
              MESSAGES.INVALID_OBJECT_ID,
              false
            )
          );
        return;
      }

      const timetable = await TimeTable.findById(timetableId).populate(
        "classId"
      );
      if (!timetable) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${timetableId}`);
        res
          .status(STATUS.NOT_FOUND)
          .json(
            responseCreator(
              STATUS.NOT_FOUND,
              MESSAGES.RESOURCE_NOT_FOUND,
              false
            )
          );
        return;
      }

      logger.info(`Fetched timetable record: ${timetableId}`);
      res
        .status(STATUS.OK)
        .json(
          responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, timetable)
        );
      return;
    }

    const timetables = await TimeTable.find().populate("classId");
    logger.info("Fetched all timetable records");
    res
      .status(STATUS.OK)
      .json(
        responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, timetables)
      );
    return;
  } catch (error: any) {
    logger.error(`Error in getTimeTables: ${error.message}`);
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json(
        responseCreator(
          STATUS.INTERNAL_SERVER_ERROR,
          MESSAGES.INTERNAL_SERVER_ERROR,
          false
        )
      );
=======
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
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
    return;
  }
};

<<<<<<< HEAD
// Create a TimeTable Record
export const createTimeTable: RequestHandler = async (
  req,
  res: ServerResponse
) => {
  const { classId, timetable } = req.body;
  try {
    const newTimeTable = new TimeTable({ classId, timetable });
    await newTimeTable.save();
    logger.info("Created a new timetable record");
    res
      .status(STATUS.CREATED)
      .json(
        responseCreator(
          STATUS.CREATED,
          MESSAGES.DATA_CREATED,
          true,
          newTimeTable
        )
      );
    return;
  } catch (error: any) {
    logger.error(`Error in createTimeTable: ${error.message}`);
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json(
        responseCreator(
          STATUS.INTERNAL_SERVER_ERROR,
          MESSAGES.INTERNAL_SERVER_ERROR,
          false
        )
      );
=======
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
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
    return;
  }
};

<<<<<<< HEAD
// Update a TimeTable Record
export const updateTimeTable: RequestHandler = async (
  req,
  res: ServerResponse
) => {
  const { timetableId } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(timetableId)) {
    logger.warn(`Invalid ObjectId format: ${timetableId}`);
    res
      .status(STATUS.BAD_REQUEST)
      .json(
        responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false)
      );
=======
// Update a TimeTable
export const updateTimeTable: RequestHandler = async (req, res: ServerResponse) => {
  const { timeTableId } = req.params;
  const timeTableData = req.body;

  if (!mongoose.Types.ObjectId.isValid(timeTableId)) {
    logger.warn(`Invalid ObjectId format: ${timeTableId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
    return;
  }

  try {
<<<<<<< HEAD
    const updatedTimeTable = await TimeTable.findByIdAndUpdate(
      timetableId,
      updateData,
      { new: true }
    );
    if (!updatedTimeTable) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${timetableId}`);
      res
        .status(STATUS.NOT_FOUND)
        .json(
          responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false)
        );
      return;
    }

    logger.info(`Updated timetable record: ${timetableId}`);
    res
      .status(STATUS.OK)
      .json(
        responseCreator(
          STATUS.OK,
          MESSAGES.DATA_UPDATED,
          true,
          updatedTimeTable
        )
      );
    return;
  } catch (error: any) {
    logger.error(`Error in updateTimeTable: ${error.message}`);
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json(
        responseCreator(
          STATUS.INTERNAL_SERVER_ERROR,
          MESSAGES.INTERNAL_SERVER_ERROR,
          false
        )
      );
=======
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
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
    return;
  }
};

<<<<<<< HEAD
// Delete a TimeTable Record
export const deleteTimeTable: RequestHandler = async (
  req,
  res: ServerResponse
) => {
  const { timetableId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(timetableId)) {
    logger.warn(`Invalid ObjectId format: ${timetableId}`);
    res
      .status(STATUS.BAD_REQUEST)
      .json(
        responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false)
      );
=======
// Delete a TimeTable
export const deleteTimeTable: RequestHandler = async (req, res: ServerResponse) => {
  const { timeTableId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(timeTableId)) {
    logger.warn(`Invalid ObjectId format: ${timeTableId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
    return;
  }

  try {
<<<<<<< HEAD
    const deletedTimeTable = await TimeTable.findByIdAndDelete(timetableId);
    if (!deletedTimeTable) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${timetableId}`);
      res
        .status(STATUS.NOT_FOUND)
        .json(
          responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false)
        );
      return;
    }

    logger.info(`Deleted timetable record: ${timetableId}`);
    res
      .status(STATUS.OK)
      .json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteTimeTable: ${error.message}`);
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json(
        responseCreator(
          STATUS.INTERNAL_SERVER_ERROR,
          MESSAGES.INTERNAL_SERVER_ERROR,
          false
        )
      );
    return;
  }
};
=======
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
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
