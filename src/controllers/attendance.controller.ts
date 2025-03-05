// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Attendance from "@models/attendance.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { AddAttendanceRecordRequest, CreateAttendanceRequest, ServerResponse, UpdateAttendanceRequest } from "@interfaces/controllers";

// Get All Attendances & Get Attendance By User ID
export const getAttendances: RequestHandler = async (req, res: ServerResponse) => {
  const { userId } = req.params;

  try {
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        logger.warn(`Invalid ObjectId format: ${userId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return;
      }

      const attendance = await Attendance.findOne({ userId }).populate("attendanceRecords.subjectId");
      if (!attendance) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${userId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched attendance records for user: ${userId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, attendance));
      return;
    }

    const attendances = await Attendance.find().populate("attendanceRecords.subjectId");
    logger.info("Fetched all attendance records");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, attendances));
    return;
  } catch (error: any) {
    logger.error(`Error in getAttendances: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Create an Attendance Record
export const createAttendance: RequestHandler = async (req: CreateAttendanceRequest, res: ServerResponse) => {
  const { userId } = req.body;

  try {
    const existingAttendance = await Attendance.findOne({ userId });
    if (existingAttendance) {
      logger.warn(`Attendance record already exists for user: ${userId}`);
      res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.DATA_ALREADY_EXISTS, false));
      return;
    }

    const newAttendance = new Attendance({ userId });
    await newAttendance.save();
    logger.info(`Created a new attendance record for user: ${userId}`);

    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newAttendance));
    return;
  } catch (error: any) {
    logger.error(`Error in createAttendance: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Add Attendance Record for a Student
export const addAttendanceRecord: RequestHandler = async (req: AddAttendanceRecordRequest, res: ServerResponse) => {
  const { attendanceId } = req.params;
  const { date, time, subjectId, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(attendanceId) || !mongoose.Types.ObjectId.isValid(subjectId)) {
    logger.warn(`Invalid ObjectId format: attendanceId - ${attendanceId}, subjectId - ${subjectId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${attendanceId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    attendance.attendanceRecords.push({ date, time, subjectId, status });
    await attendance.save();

    logger.info(`Added new attendance record for user: ${attendanceId}`);
    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, attendance));
    return;
  } catch (error: any) {
    logger.error(`Error in addAttendanceRecord: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update an Attendance Record
export const updateAttendance: RequestHandler = async (req: UpdateAttendanceRequest, res: ServerResponse) => {
  const { attendanceId } = req.params;
  const { attendanceRecords } = req.body;

  if (!mongoose.Types.ObjectId.isValid(attendanceId)) {
    logger.warn(`Invalid ObjectId format: ${attendanceId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      { $set: { attendanceRecords } },
      { new: true }
    );

    if (!updatedAttendance) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${attendanceId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Updated attendance records for user: ${attendanceId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedAttendance));
    return;
  } catch (error: any) {
    logger.error(`Error in updateAttendance: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Delete an Attendance Record
export const deleteAttendance: RequestHandler = async (req, res: ServerResponse) => {
  const { attendanceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(attendanceId)) {
    logger.warn(`Invalid ObjectId format: ${attendanceId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const deletedAttendance = await Attendance.findByIdAndDelete(attendanceId);

    if (!deletedAttendance) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${attendanceId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted attendance record for user: ${attendanceId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteAttendance: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};
