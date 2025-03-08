// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Student from "@models/student.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { ServerResponse } from "@interfaces/controllers";

// Get All Students & Get Student By ID
export const getStudents: RequestHandler = async (req, res: ServerResponse) => {
  const { studentId } = req.params;

  try {
    if (studentId) {
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        logger.warn(`Invalid ObjectId format: ${studentId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return;
      }

      const student = await Student.findById(studentId)
        .populate("userId")
        .populate("profileId")
        .populate("instituteId")
        .populate("departmentId")
        .populate("classId")
        .populate("attendanceId")
        .populate("requests")
        .populate("results")
        .populate("notifications")
        .populate("fees")
        .populate("hallTickets");

      if (!student) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${studentId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched student: ${studentId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, student));
      return;
    }

    const students = await Student.find()
      .populate("userId")
      .populate("profileId")
      .populate("instituteId")
      .populate("departmentId")
      .populate("classId")
      .populate("attendanceId")
      .populate("requests")
      .populate("results")
      .populate("notifications")
      .populate("fees")
      .populate("hallTickets");

    logger.info("Fetched all students");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, students));
    return;
  } catch (error: any) {
    logger.error(`Error in getStudents: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Create a Student
export const createStudent: RequestHandler = async (req, res: ServerResponse) => {
  const studentData = req.body;

  try {
    const newStudent = await Student.create(studentData);
    logger.info(`Created a new student: ${newStudent._id}`);

    const populatedStudent = await Student.findById(newStudent._id)
      .populate("userId")
      .populate("profileId")
      .populate("instituteId")
      .populate("departmentId")
      .populate("classId")
      .populate("attendanceId")
      .populate("requests")
      .populate("results")
      .populate("notifications")
      .populate("fees")
      .populate("hallTickets");

    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, populatedStudent ?? {}));
    return;
  } catch (error: any) {
    logger.error(`Error in createStudent: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update a Student
export const updateStudent: RequestHandler = async (req, res: ServerResponse) => {
  const { studentId } = req.params;
  const studentData = req.body;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    logger.warn(`Invalid ObjectId format: ${studentId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, studentData, { new: true })
      .populate("userId")
      .populate("profileId")
      .populate("instituteId")
      .populate("departmentId")
      .populate("classId")
      .populate("attendanceId")
      .populate("requests")
      .populate("results")
      .populate("notifications")
      .populate("fees")
      .populate("hallTickets");

    if (!updatedStudent) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${studentId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Updated student: ${studentId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedStudent));
    return;
  } catch (error: any) {
    logger.error(`Error in updateStudent: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Delete a Student
export const deleteStudent: RequestHandler = async (req, res: ServerResponse) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    logger.warn(`Invalid ObjectId format: ${studentId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${studentId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted student: ${studentId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteStudent: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
}; 