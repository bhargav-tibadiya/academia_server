// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import HallTicket from "@models/hallticket.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { CreateUpdateRequest, ServerResponse, UpdateUpdateRequest } from "@interfaces/controllers";

// Get All Hall Tickets & Get Hall Ticket By ID
export const getHallTickets: RequestHandler = async (req, res: ServerResponse) => {
  const { hallTicketId } = req.params;

  try {
    if (hallTicketId) {
      if (hallTicketId && !mongoose.Types.ObjectId.isValid(hallTicketId)) {
        logger.warn(`Invalid ObjectId format: ${hallTicketId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return;
      }

      const hallTicket = await HallTicket.findById(hallTicketId);

      if (!hallTicket) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${hallTicketId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched hall ticket: ${hallTicketId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, hallTicket));
      return;
    }

    const hallTickets = await HallTicket.find();
    logger.info("Fetched all hall tickets");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, hallTickets));
    return;
  } catch (error: any) {
    logger.error(`Error in getHallTickets: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Create a Hall Ticket
export const createHallTicket: RequestHandler = async (req: CreateUpdateRequest, res: ServerResponse) => {
  const hallTicketData = req.body;

  try {
    const newHallTicket = await HallTicket.create(hallTicketData);
    logger.info(`Created a new hall ticket: ${newHallTicket._id}`);

    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newHallTicket));
    return;
  } catch (error: any) {
    logger.error(`Error in createHallTicket: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update a Hall Ticket
export const updateHallTicket: RequestHandler = async (req: UpdateUpdateRequest, res: ServerResponse) => {
  const { hallTicketId } = req.params;
  const hallTicketData = req.body;

  if (hallTicketId && !mongoose.Types.ObjectId.isValid(hallTicketId)) {
    logger.warn(`Invalid ObjectId format: ${hallTicketId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const updatedHallTicket = await HallTicket.findByIdAndUpdate(hallTicketId, hallTicketData, { new: true });

    if (!updatedHallTicket) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${hallTicketId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Updated hall ticket: ${hallTicketId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedHallTicket));
    return;
  } catch (error: any) {
    logger.error(`Error in updateHallTicket: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Delete a Hall Ticket
export const deleteHallTicket: RequestHandler = async (req, res: ServerResponse) => {
  const { hallTicketId } = req.params;

  if (hallTicketId && !mongoose.Types.ObjectId.isValid(hallTicketId)) {
    logger.warn(`Invalid ObjectId format: ${hallTicketId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const deletedHallTicket = await HallTicket.findByIdAndDelete(hallTicketId);

    if (!deletedHallTicket) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${hallTicketId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted hall ticket: ${hallTicketId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteHallTicket: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};
