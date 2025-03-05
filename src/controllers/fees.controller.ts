import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Fee from "@models/fee.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { ServerResponse } from "@interfaces/controllers";

// TODO: On creation of fees append id to related student also add student id required in create joi payload validation

// Get All Fees & Get Fee By ID
export const getFees: RequestHandler = async (req, res: ServerResponse) => {
  const { feeId } = req.params;

  try {
    if (feeId) {
      if (!mongoose.Types.ObjectId.isValid(feeId)) {
        logger.warn(`Invalid ObjectId format: ${feeId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return;
      }

      const fee = await Fee.findById(feeId);
      if (!fee) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${feeId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched fee: ${feeId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, fee));
      return;
    }

    const fees = await Fee.find();
    logger.info("Fetched all fees");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, fees));
    return;
  } catch (error: any) {
    logger.error(`Error in getFees: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Create a Fee
export const createFee: RequestHandler = async (req, res: ServerResponse) => {
  const feeData = req.body;

  try {
    const newFee = await Fee.create(feeData);
    logger.info(`Created a new fee: ${newFee._id}`);

    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newFee));
    return;
  } catch (error: any) {
    logger.error(`Error in createFee: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update a Fee
export const updateFee: RequestHandler = async (req, res: ServerResponse) => {
  const { feeId } = req.params;
  const feeData = req.body;

  if (!mongoose.Types.ObjectId.isValid(feeId)) {
    logger.warn(`Invalid ObjectId format: ${feeId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const updatedFee = await Fee.findByIdAndUpdate(feeId, feeData, { new: true });

    if (!updatedFee) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${feeId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Updated fee: ${feeId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedFee));
    return;
  } catch (error: any) {
    logger.error(`Error in updateFee: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Delete a Fee
export const deleteFee: RequestHandler = async (req, res: ServerResponse) => {
  const { feeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(feeId)) {
    logger.warn(`Invalid ObjectId format: ${feeId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const deletedFee = await Fee.findByIdAndDelete(feeId);

    if (!deletedFee) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${feeId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted fee: ${feeId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteFee: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};
