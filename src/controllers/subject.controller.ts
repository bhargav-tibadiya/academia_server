import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Subject from "@models/subject.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { CreateSubjectRequest, ServerResponse, UpdateSubjectRequest } from "@interfaces/controllers";

// Get All Subjects & Get Subject By ID
export const getSubjects: RequestHandler = async (req, res: ServerResponse) => {
  const { subjectId } = req.params;

  try {
    if (subjectId) {
      if (!mongoose.Types.ObjectId.isValid(subjectId)) {
        logger.warn(`Invalid ObjectId format: ${subjectId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return;
      }

      const subject = await Subject.findById(subjectId);
      if (!subject) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${subjectId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched subject: ${subjectId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, subject));
      return;
    }

    const subjects = await Subject.find();
    logger.info("Fetched all subjects");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, subjects));
    return;
  } catch (error: any) {
    logger.error(`Error in getSubjects: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Create a Subject
export const createSubject: RequestHandler = async (req: CreateSubjectRequest, res: ServerResponse) => {
  const subjectData = req.body;

  try {
    const newSubject = await Subject.create(subjectData);
    logger.info(`Created a new subject: ${newSubject._id}`);

    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newSubject));
    return;
  } catch (error: any) {
    logger.error(`Error in createSubject: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update a Subject
export const updateSubject: RequestHandler = async (req: UpdateSubjectRequest, res: ServerResponse) => {
  const { subjectId } = req.params;
  const subjectData = req.body;

  if (!mongoose.Types.ObjectId.isValid(subjectId)) {
    logger.warn(`Invalid ObjectId format: ${subjectId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const updatedSubject = await Subject.findByIdAndUpdate(subjectId, subjectData, { new: true });

    if (!updatedSubject) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${subjectId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Updated subject: ${subjectId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedSubject));
    return;
  } catch (error: any) {
    logger.error(`Error in updateSubject: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Delete a Subject
export const deleteSubject: RequestHandler = async (req, res: ServerResponse) => {
  const { subjectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(subjectId)) {
    logger.warn(`Invalid ObjectId format: ${subjectId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const deletedSubject = await Subject.findByIdAndDelete(subjectId);

    if (!deletedSubject) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${subjectId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted subject: ${subjectId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteSubject: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};