// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Result from "@models/result.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { ServerResponse } from "@interfaces/controllers";

// Get All Results & Get Result By ID
export const getResults: RequestHandler = async (req, res: ServerResponse) => {
  const { resultId } = req.params;

  try {
    if (resultId) {
      if (!mongoose.Types.ObjectId.isValid(resultId)) {
        logger.warn(`Invalid ObjectId format: ${resultId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return;
      }

      const result = await Result.findById(resultId);
      if (!result) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${resultId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched result: ${resultId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, result));
      return;
    }

    const results = await Result.find().sort({ semester: 1 });
    logger.info("Fetched all results");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, results));
    return;
  } catch (error: any) {
    logger.error(`Error in getResults: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Create a Result
export const createResult: RequestHandler = async (req, res: ServerResponse) => {
  const resultData = req.body;

  try {
    const newResult = await Result.create(resultData);
    logger.info(`Created a new result: ${newResult._id}`);

    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newResult));
    return;
  } catch (error: any) {
    logger.error(`Error in createResult: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update a Result
export const updateResult: RequestHandler = async (req, res: ServerResponse) => {
  const { resultId } = req.params;
  const resultData = req.body;

  if (!mongoose.Types.ObjectId.isValid(resultId)) {
    logger.warn(`Invalid ObjectId format: ${resultId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const updatedResult = await Result.findByIdAndUpdate(resultId, resultData, { new: true });

    if (!updatedResult) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${resultId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Updated result: ${resultId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedResult));
    return;
  } catch (error: any) {
    logger.error(`Error in updateResult: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Delete a Result
export const deleteResult: RequestHandler = async (req, res: ServerResponse) => {
  const { resultId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(resultId)) {
    logger.warn(`Invalid ObjectId format: ${resultId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const deletedResult = await Result.findByIdAndDelete(resultId);

    if (!deletedResult) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${resultId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted result: ${resultId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteResult: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
}; 