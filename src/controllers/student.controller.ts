// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Student from "@models/student.model";
import User from "@models/user.model";
import Profile from "@models/profile.model";
import Institute from "@models/institute.model";
import Department from "@models/department.model";
import Class from "@models/class.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { ServerResponse } from "@interfaces/controllers";
import { CreateStudentRequest, DeleteStudentRequest, UpdateStudentRequest } from "@interfaces/controllers/student.interface";

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
export const createStudent: RequestHandler = async (req: CreateStudentRequest, res: ServerResponse) => {
  const studentData = req.body;

  try {
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(studentData.userId)) {
      logger.warn(`Invalid User ObjectId format: ${studentData.userId}`);
      res.status(STATUS.BAD_REQUEST).json(
        responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false)
      );
      return;
    }

    // Validate profileId
    if (!mongoose.Types.ObjectId.isValid(studentData.profileId)) {
      logger.warn(`Invalid Profile ObjectId format: ${studentData.profileId}`);
      res.status(STATUS.BAD_REQUEST).json(
        responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false)
      );
      return;
    }

    // Validate instituteId
    if (!mongoose.Types.ObjectId.isValid(studentData.instituteId)) {
      logger.warn(`Invalid Institute ObjectId format: ${studentData.instituteId}`);
      res.status(STATUS.BAD_REQUEST).json(
        responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false)
      );
      return;
    }

    // Validate departmentId
    if (!mongoose.Types.ObjectId.isValid(studentData.departmentId)) {
      logger.warn(`Invalid Department ObjectId format: ${studentData.departmentId}`);
      res.status(STATUS.BAD_REQUEST).json(
        responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false)
      );
      return;
    }

    // Validate classId
    if (!mongoose.Types.ObjectId.isValid(studentData.classId)) {
      logger.warn(`Invalid Class ObjectId format: ${studentData.classId}`);
      res.status(STATUS.BAD_REQUEST).json(
        responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false)
      );
      return;
    }

    // Check if user exists
    const user = await User.findById(studentData.userId);
    if (!user) {
      logger.warn(`User not found: ${studentData.userId}`);
      res.status(STATUS.NOT_FOUND).json(
        responseCreator(STATUS.NOT_FOUND, "User not found", false)
      );
      return;
    }

    // Check if profile exists
    const profile = await Profile.findById(studentData.profileId);
    if (!profile) {
      logger.warn(`Profile not found: ${studentData.profileId}`);
      res.status(STATUS.NOT_FOUND).json(
        responseCreator(STATUS.NOT_FOUND, "Profile not found", false)
      );
      return;
    }

    // Check if institute exists
    const institute = await Institute.findById(studentData.instituteId);
    if (!institute) {
      logger.warn(`Institute not found: ${studentData.instituteId}`);
      res.status(STATUS.NOT_FOUND).json(
        responseCreator(STATUS.NOT_FOUND, "Institute not found", false)
      );
      return;
    }

    // Check if department exists
    const department = await Department.findById(studentData.departmentId);
    if (!department) {
      logger.warn(`Department not found: ${studentData.departmentId}`);
      res.status(STATUS.NOT_FOUND).json(
        responseCreator(STATUS.NOT_FOUND, "Department not found", false)
      );
      return;
    }

    // Check if class exists
    const classExists = await Class.findById(studentData.classId);
    if (!classExists) {
      logger.warn(`Class not found: ${studentData.classId}`);
      res.status(STATUS.NOT_FOUND).json(
        responseCreator(STATUS.NOT_FOUND, "Class not found", false)
      );
      return;
    }

    // Create student after all validations pass
    const newStudent = await Student.create(studentData);

    // Add student to class
    await Class.findByIdAndUpdate(
      studentData.classId,
      { $push: { students: newStudent._id } },
      { new: true }
    );

    const populatedStudent = await Student.findById(newStudent._id)
      .populate("userId")
      .populate("profileId")
      .populate("instituteId")
      .populate("departmentId")
      .populate("classId");

    logger.info(`Created a new student: ${newStudent._id} and added to class: ${studentData.classId}`);
    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, populatedStudent ?? {}));
    return;
  } catch (error: any) {
    logger.error(`Error in createStudent: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update a Student
export const updateStudent: RequestHandler<{ studentId: string }> = async (req: UpdateStudentRequest, res: ServerResponse) => {
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
export const deleteStudent: RequestHandler<{ studentId: string }> = async (req: DeleteStudentRequest, res: ServerResponse) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    logger.warn(`Invalid ObjectId format: ${studentId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const classWithStudent = await Class.findOne({ students: studentId });

    if (!classWithStudent) {
      logger.warn(`No class found containing student: ${studentId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, "No class found containing this student", false));
      return;
    }

    await Class.findByIdAndUpdate(
      classWithStudent._id,
      { $pull: { students: studentId } },
      { new: true }
    );

    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${studentId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted student: ${studentId} and removed from class: ${classWithStudent._id}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteStudent: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};