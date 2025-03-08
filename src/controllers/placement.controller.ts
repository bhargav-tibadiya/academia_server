// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Placement from "@models/placement.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { ServerResponse } from "@interfaces/controllers";

// Get All Placements & Get Placement By ID
export const getPlacements: RequestHandler = async (req, res: ServerResponse) => {
  const { placementId } = req.params;

  try {
    if (placementId) {
      if (!mongoose.Types.ObjectId.isValid(placementId)) {
        logger.warn(`Invalid ObjectId format: ${placementId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return;
      }

      const placement = await Placement.findById(placementId).populate("appliedStudents");
      if (!placement) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${placementId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched placement: ${placementId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, placement));
      return;
    }

    const placements = await Placement.find().populate("appliedStudents");
    logger.info("Fetched all placements");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, placements));
    return;
  } catch (error: any) {
    logger.error(`Error in getPlacements: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Create a Placement
export const createPlacement: RequestHandler = async (req, res: ServerResponse) => {
  const placementData = req.body;

  try {
    const newPlacement = await Placement.create(placementData);
    logger.info(`Created a new placement: ${newPlacement._id}`);

    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newPlacement));
    return;
  } catch (error: any) {
    logger.error(`Error in createPlacement: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update a Placement
export const updatePlacement: RequestHandler = async (req, res: ServerResponse) => {
  const { placementId } = req.params;
  const placementData = req.body;

  if (!mongoose.Types.ObjectId.isValid(placementId)) {
    logger.warn(`Invalid ObjectId format: ${placementId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const updatedPlacement = await Placement.findByIdAndUpdate(placementId, placementData, { new: true })
      .populate("appliedStudents");

    if (!updatedPlacement) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${placementId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Updated placement: ${placementId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedPlacement));
    return;
  } catch (error: any) {
    logger.error(`Error in updatePlacement: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Delete a Placement
export const deletePlacement: RequestHandler = async (req, res: ServerResponse) => {
  const { placementId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(placementId)) {
    logger.warn(`Invalid ObjectId format: ${placementId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const deletedPlacement = await Placement.findByIdAndDelete(placementId);

    if (!deletedPlacement) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${placementId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted placement: ${placementId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deletePlacement: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
}; 