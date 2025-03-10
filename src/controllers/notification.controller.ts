// Packages
import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Notification from "@models/notification.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { CreateUpdateRequest, ServerResponse, UpdateUpdateRequest } from "@interfaces/controllers";

// Get All Notifications & Get Notification By ID
export const getNotifications: RequestHandler = async (req, res: ServerResponse) => {
  const { notificationId } = req.params;

  try {
    if (notificationId) {
      if (notificationId && !mongoose.Types.ObjectId.isValid(notificationId)) {
        logger.warn(`Invalid ObjectId format: ${notificationId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return;
      }

      const notification = await Notification.findById(notificationId);

      if (!notification) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${notificationId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched notification: ${notificationId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, notification));
      return;
    }

    const notifications = await Notification.find().sort({ date: -1 });
    logger.info("Fetched all notifications");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, notifications));
    return;
  } catch (error: any) {
    logger.error(`Error in getNotifications: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Create a Notification
export const createNotification: RequestHandler = async (req: CreateUpdateRequest, res: ServerResponse) => {
  const notificationData = req.body;

  try {
    const newNotification = await Notification.create(notificationData);
    logger.info(`Created a new notification: ${newNotification._id}`);

    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newNotification));
    return;
  } catch (error: any) {
    logger.error(`Error in createNotification: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update a Notification
export const updateNotification: RequestHandler = async (req: UpdateUpdateRequest, res: ServerResponse) => {
  const { notificationId } = req.params;
  const notificationData = req.body;

  if (notificationId && !mongoose.Types.ObjectId.isValid(notificationId)) {
    logger.warn(`Invalid ObjectId format: ${notificationId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const updatedNotification = await Notification.findByIdAndUpdate(notificationId, notificationData, { new: true });

    if (!updatedNotification) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${notificationId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Updated notification: ${notificationId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedNotification));
    return;
  } catch (error: any) {
    logger.error(`Error in updateNotification: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Delete a Notification
export const deleteNotification: RequestHandler = async (req, res: ServerResponse) => {
  const { notificationId } = req.params;

  if (notificationId && !mongoose.Types.ObjectId.isValid(notificationId)) {
    logger.warn(`Invalid ObjectId format: ${notificationId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const deletedNotification = await Notification.findByIdAndDelete(notificationId);

    if (!deletedNotification) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${notificationId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted notification: ${notificationId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteNotification: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
}; 