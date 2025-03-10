// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Request from "@models/request.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { ServerResponse } from "@interfaces/controllers";

// Get All Requests & Get Request By ID
export const getRequests: RequestHandler = async (req, res: ServerResponse) => {
  const { requestId } = req.params;

  try {
    if (requestId) {
      if (!mongoose.Types.ObjectId.isValid(requestId)) {
        logger.warn(`Invalid ObjectId format: ${requestId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return;
      }

      const request = await Request.findById(requestId)
        .populate("creator")
        .populate("assignee");

      if (!request) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${requestId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched request: ${requestId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, request));
      return;
    }

    const requests = await Request.find()
      .populate("creator")
      .populate("assignee")
      .sort({ date: -1 });

    logger.info("Fetched all requests");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, requests));
    return;
  } catch (error: any) {
    logger.error(`Error in getRequests: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Create a Request
export const createRequest: RequestHandler = async (req, res: ServerResponse) => {
  const requestData = req.body;

  try {
    const newRequest = await Request.create({
      ...requestData,
      lastUpdated: new Date()
    });
    logger.info(`Created a new request: ${newRequest._id}`);

    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newRequest));
    return;
  } catch (error: any) {
    logger.error(`Error in createRequest: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update a Request
export const updateRequest: RequestHandler = async (req, res: ServerResponse) => {
  const { requestId } = req.params;
  const requestData = req.body;

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    logger.warn(`Invalid ObjectId format: ${requestId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      {
        ...requestData,
        lastUpdated: new Date()
      },
      { new: true }
    )
      .populate("creator")
      .populate("assignee");

    if (!updatedRequest) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${requestId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Updated request: ${requestId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedRequest));
    return;
  } catch (error: any) {
    logger.error(`Error in updateRequest: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Delete a Request
export const deleteRequest: RequestHandler = async (req, res: ServerResponse) => {
  const { requestId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    logger.warn(`Invalid ObjectId format: ${requestId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const deletedRequest = await Request.findByIdAndDelete(requestId);

    if (!deletedRequest) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${requestId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted request: ${requestId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteRequest: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
}; 