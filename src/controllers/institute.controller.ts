// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Institute from "@models/institute.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { ServerResponse } from "@interfaces/controllers";

// Get All Institutes & Get Institute By ID
export const getInstitutes: RequestHandler = async (req, res: ServerResponse) => {
  const { instituteId } = req.params;

  try {
    if (instituteId) {
      if (!mongoose.Types.ObjectId.isValid(instituteId)) {
        logger.warn(`Invalid ObjectId format: ${instituteId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return;
      }

      const institute = await Institute.findById(instituteId);
      if (!institute) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${instituteId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched institute: ${instituteId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, institute));
      return;
    }

    // If no instituteId, fetch all institutes
    const institutes = await Institute.find();
    logger.info("Fetched all institutes");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, institutes));
    return;
  } catch (error: any) {
    logger.error(`Error in getInstitutes: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Create an Institute
export const createInstitute: RequestHandler = async (req, res: ServerResponse) => {
  const instituteData = req.body;

  try {
    const newInstitute = await Institute.create(instituteData);
    logger.info(`Created a new institute: ${newInstitute._id}`);

    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newInstitute));
    return;
  } catch (error: any) {
    logger.error(`Error in createInstitute: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update an Institute
export const updateInstitute: RequestHandler = async (req, res: ServerResponse) => {
  const { instituteId } = req.params;
  const instituteData = req.body;

  if (!mongoose.Types.ObjectId.isValid(instituteId)) {
    logger.warn(`Invalid ObjectId format: ${instituteId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const updatedInstitute = await Institute.findByIdAndUpdate(instituteId, instituteData, { new: true });

    if (!updatedInstitute) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${instituteId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Updated institute: ${instituteId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedInstitute));
    return;
  } catch (error: any) {
    logger.error(`Error in updateInstitute: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Delete an Institute
export const deleteInstitute: RequestHandler = async (req, res: ServerResponse) => {
  const { instituteId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(instituteId)) {
    logger.warn(`Invalid ObjectId format: ${instituteId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const deletedInstitute = await Institute.findByIdAndDelete(instituteId);

    if (!deletedInstitute) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${instituteId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted institute: ${instituteId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteInstitute: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};
