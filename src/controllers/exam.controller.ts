// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Exam from "@models/exam.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { ServerResponse } from "@interfaces/controllers";

// Get All Exams & Get Exam By ID
export const getExams: RequestHandler = async (req, res: ServerResponse) => {
  const { examId } = req.params;

  try {
    if (examId) {
      if (!mongoose.Types.ObjectId.isValid(examId)) {
        logger.warn(`Invalid ObjectId format: ${examId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return;
      }

      const exam = await Exam.findById(examId)
        .populate({
          path: 'responses.userId',
          select: 'email name'
        })
        .populate({
          path: 'results.userId',
          select: 'email name'
        });

      if (!exam) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${examId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched exam: ${examId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, exam));
      return;
    }

    const exams = await Exam.find()
      .populate({
        path: 'responses.userId',
        select: 'email name'
      })
      .populate({
        path: 'results.userId',
        select: 'email name'
      });

    logger.info("Fetched all exams");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, exams));
    return;
  } catch (error: any) {
    logger.error(`Error in getExams: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Create an Exam
export const createExam: RequestHandler = async (req, res: ServerResponse) => {
  const examData = req.body;

  try {
    if (new Date(examData.startTime) >= new Date(examData.endTime)) {
      logger.warn("End time must be after start time");
      res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, "End time must be after start time", false));
      return;
    }

    const newExam = await Exam.create(examData);
    logger.info(`Created a new exam: ${newExam._id}`);

    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newExam));
    return;
  } catch (error: any) {
    logger.error(`Error in createExam: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update an Exam
export const updateExam: RequestHandler = async (req, res: ServerResponse) => {
  const { examId } = req.params;
  const examData = req.body;

  if (!mongoose.Types.ObjectId.isValid(examId)) {
    logger.warn(`Invalid ObjectId format: ${examId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    if (examData.startTime && examData.endTime) {
      if (new Date(examData.startTime) >= new Date(examData.endTime)) {
        logger.warn("End time must be after start time");
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, "End time must be after start time", false));
        return;
      }
    }

    const updatedExam = await Exam.findByIdAndUpdate(examId, examData, { new: true })
      .populate({
        path: 'responses.userId',
        select: 'email name'
      })
      .populate({
        path: 'results.userId',
        select: 'email name'
      });

    if (!updatedExam) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${examId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Updated exam: ${examId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedExam));
    return;
  } catch (error: any) {
    logger.error(`Error in updateExam: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Delete an Exam
export const deleteExam: RequestHandler = async (req, res: ServerResponse) => {
  const { examId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(examId)) {
    logger.warn(`Invalid ObjectId format: ${examId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const deletedExam = await Exam.findByIdAndDelete(examId);

    if (!deletedExam) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${examId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted exam: ${examId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteExam: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
}; 