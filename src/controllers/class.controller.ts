// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Class from "@models/class.model";
<<<<<<< HEAD
=======
import Department from "@models/department.model";
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
<<<<<<< HEAD
import { ServerResponse } from "@interfaces/controllers";
=======
import { CreateClassRequest, DeleteClassRequest, ServerResponse, UpdateClassRequest } from "@interfaces/controllers";
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e

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

<<<<<<< HEAD
      const classData = await Class.findById(classId).populate("students").populate("timeTableId").populate("exams").populate("updates");
=======
      const classData = await Class.findById(classId)
        .populate("students")
        .populate("timeTableId")
        .populate("exams")
        .populate("updates");

>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
      if (!classData) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${classId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

<<<<<<< HEAD
      logger.info(`Fetched class record: ${classId}`);
=======
      logger.info(`Fetched class: ${classId}`);
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, classData));
      return;
    }

<<<<<<< HEAD
    const classes = await Class.find().populate("students").populate("timeTableId").populate("exams").populate("updates");
    logger.info("Fetched all class records");
=======
    const classes = await Class.find()
      .populate("students")
      .populate("timeTableId")
      .populate("exams")
      .populate("updates");

    logger.info("Fetched all classes");
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, classes));
    return;
  } catch (error: any) {
    logger.error(`Error in getClasses: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

<<<<<<< HEAD
// Create a Class Record
export const createClass: RequestHandler = async (req, res: ServerResponse) => {
  const { name, students, timeTableId, exams, updates } = req.body;

  try {
    const newClass = new Class({ name, students, timeTableId, exams, updates });
    await newClass.save();
    logger.info("Created a new class record");

=======
// Create a Class
export const createClass: RequestHandler = async (req: CreateClassRequest, res: ServerResponse) => {
  const classData = req.body;

  try {
    // Check if department exists
    if (!mongoose.Types.ObjectId.isValid(classData.departmentId)) {
      logger.warn(`Invalid Department ObjectId format: ${classData.departmentId}`);
      res.status(STATUS.BAD_REQUEST).json(
        responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false)
      );
      return;
    }

    const department = await Department.findById(classData.departmentId);
    if (!department) {
      logger.warn(`Department not found: ${classData.departmentId}`);
      res.status(STATUS.NOT_FOUND).json(
        responseCreator(STATUS.NOT_FOUND, "Department not found", false)
      );
      return;
    }

    const newClass = await Class.create(classData);

    // Add class to department
    await Department.findByIdAndUpdate(
      classData.departmentId,
      { $push: { classes: newClass._id } },
      { new: true }
    );

    logger.info(`Created a new class: ${newClass._id} and added to department: ${classData.departmentId}`);
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newClass));
    return;
  } catch (error: any) {
    logger.error(`Error in createClass: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

<<<<<<< HEAD
// Update a Class Record
export const updateClass: RequestHandler = async (req, res: ServerResponse) => {
  const { classId } = req.params;
  const updateData = req.body;
=======
// Update a Class
export const updateClass: RequestHandler<{ classId: string }> = async (req: UpdateClassRequest, res: ServerResponse) => {
  const { classId } = req.params;
  const classData = req.body;
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e

  if (!mongoose.Types.ObjectId.isValid(classId)) {
    logger.warn(`Invalid ObjectId format: ${classId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
<<<<<<< HEAD
    const updatedClass = await Class.findByIdAndUpdate(classId, updateData, { new: true });
=======
    const updatedClass = await Class.findByIdAndUpdate(classId, classData, { new: true })
      .populate("students")
      .populate("timeTableId")
      .populate("exams")
      .populate("updates");
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e

    if (!updatedClass) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${classId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

<<<<<<< HEAD
    logger.info(`Updated class record: ${classId}`);
=======
    logger.info(`Updated class: ${classId}`);
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedClass));
    return;
  } catch (error: any) {
    logger.error(`Error in updateClass: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

<<<<<<< HEAD
// Delete a Class Record
export const deleteClass: RequestHandler = async (req, res: ServerResponse) => {
=======
// Delete a Class
export const deleteClass: RequestHandler<{ classId: string }> = async (req: DeleteClassRequest, res: ServerResponse) => {
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
  const { classId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(classId)) {
    logger.warn(`Invalid ObjectId format: ${classId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
<<<<<<< HEAD
=======
    const department = await Department.findOne({ classes: classId });

    if (!department) {
      logger.warn(`No department found containing class: ${classId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, "No department found containing this class", false));
      return;
    }

    await Department.findByIdAndUpdate(
      department._id,
      { $pull: { classes: classId } },
      { new: true }
    );

>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
    const deletedClass = await Class.findByIdAndDelete(classId);

    if (!deletedClass) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${classId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

<<<<<<< HEAD
    logger.info(`Deleted class record: ${classId}`);
=======
    logger.info(`Deleted class: ${classId} and removed from department: ${department._id}`);
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteClass: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
