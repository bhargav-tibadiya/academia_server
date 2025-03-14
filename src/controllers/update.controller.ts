// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Update from "@models/update.model";
import Class from "@models/class.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { CreateUpdateRequest, ServerResponse, UpdateUpdateRequest } from "@interfaces/controllers";


// Get All Updates & Get Update By ID
export const getUpdates: RequestHandler = async (req, res: ServerResponse) => {
  const { updateId } = req.params;

  try {
    if (updateId) {

      if (updateId && !mongoose.Types.ObjectId.isValid(updateId)) {
        logger.warn(`Invalid ObjectId format: ${updateId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return
      }

      const update = await Update.findById(updateId);

      if (!update) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${updateId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return
      }

      logger.info(`Fetched update: ${updateId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, update));
      return
    }

    // Fetch all updates
    const updates = await Update.find();
    logger.info("Fetched all updates");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, updates));
    return
  } catch (error: any) {
    logger.error(`Error in getUpdates: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return
  }
};

// Create an Update
export const createUpdate: RequestHandler = async (req: CreateUpdateRequest, res: ServerResponse) => {
  const updateData = req.body;

  try {
    const newUpdate = await Update.create(updateData);
    logger.info(`Created a new update: ${newUpdate._id}`);

    const classToUpdate = await Class.findById(updateData.class);
    if (!classToUpdate) {
      logger.warn(`Class not found with ID: ${updateData.class}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return
    }

    classToUpdate.updates.push(newUpdate._id);
    await classToUpdate.save();
    logger.info(`Appended update ID to class: ${classToUpdate._id}`);

    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newUpdate));
    return;
  } catch (error: any) {
    logger.error(`Error in create Update: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update an Update
export const updateUpdate: RequestHandler = async (req: UpdateUpdateRequest, res: ServerResponse) => {
  const { updateId } = req.params;
  const updateData = req.body;

  if (updateId && !mongoose.Types.ObjectId.isValid(updateId)) {
    logger.warn(`Invalid ObjectId format: ${updateId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return
  }

  try {
    const updatedUpdate = await Update.findByIdAndUpdate(updateId, updateData, { new: true });

    if (!updatedUpdate) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${updateId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return
    }

    logger.info(`Updated update: ${updateId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedUpdate));
    return
  } catch (error: any) {
    logger.error(`Error in updateUpdate: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return
  }
};

// Delete an Update
export const deleteUpdate: RequestHandler = async (req, res: ServerResponse) => {
  const { updateId } = req.params;

  if (updateId && !mongoose.Types.ObjectId.isValid(updateId)) {
    logger.warn(`Invalid ObjectId format: ${updateId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return
  }

  try {
    const deletedUpdate = await Update.findByIdAndDelete(updateId);

    if (!deletedUpdate) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${updateId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    const classToUpdate = await Class.findOne({ updates: updateId });
    if (!classToUpdate) {
      logger.warn(`Class not found for update ID: ${updateId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, `Class not found for update ID: ${updateId}`, false));
      return
    }

    classToUpdate.updates = classToUpdate.updates.filter(update => update.toString() !== updateId);
    await classToUpdate.save();
    logger.info(`Removed update ID from class: ${classToUpdate._id}`);

    logger.info(`Deleted update: ${updateId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return
  } catch (error: any) {
    logger.error(`Error in deleteUpdate: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return
  }
};