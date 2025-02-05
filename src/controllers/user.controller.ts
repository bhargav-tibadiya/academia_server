// Packages
import { RequestHandler } from "express";


// Models
import User from "@models/user.model";


// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";


// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { ServerResponse } from "@interfaces/controllers";


// --> Get all users
export const getAllUsers: RequestHandler = async (_, res: ServerResponse) => {
  try {
    const users = await User.find();
    logger.info("Fetched all users");

    const response = responseCreator(STATUS.OK, MESSAGES.USER_FETCHED, true, users);
    res.status(STATUS.OK).json(response);
  } catch (error: any) {
    logger.error(`Error in getAllUsers: ${error.message}`);
    const response = responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(response);
  }
};

// --> Get user by ID
export const getUserById: RequestHandler = async (req, res: ServerResponse) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      logger.warn(`${MESSAGES.USER_NOT_FOUND}: ${userId}`);
      const response = responseCreator(STATUS.NOT_FOUND, MESSAGES.USER_NOT_FOUND, false);
      res.status(STATUS.NOT_FOUND).json(response);
      return;
    }

    logger.info(`Fetched user: ${userId}`);
    const response = responseCreator(STATUS.OK, MESSAGES.USER_FETCHED, true, user);
    res.status(STATUS.OK).json(response);
  } catch (error: any) {
    logger.error(`Error in getUserById: ${error.message}`);
    const response = responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(response);
  }
};

// --> Update user
export const updateUser: RequestHandler = async (req, res: ServerResponse) => {
  const { userId } = req.params;
  const { email } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ userId }, email, { new: true, runValidators: true });

    if (!updatedUser) {
      logger.warn(`${MESSAGES.USER_NOT_FOUND}: ${userId}`);
      const response = responseCreator(STATUS.NOT_FOUND, MESSAGES.USER_NOT_FOUND, false);
      res.status(STATUS.NOT_FOUND).json(response);
      return;
    }

    logger.info(`Updated user: ${userId}`);
    const response = responseCreator(STATUS.OK, MESSAGES.USER_UPDATED, true, updatedUser);
    res.status(STATUS.OK).json(response);
  } catch (error: any) {
    logger.error(`Error in updateUser: ${error.message}`);
    const response = responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(response);
  }
};

// --> Delete user
export const deleteUser: RequestHandler = async (req, res: ServerResponse) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ userId });

    if (!deletedUser) {
      logger.warn(`${MESSAGES.USER_NOT_FOUND}: ${userId}`);
      const response = responseCreator(STATUS.NOT_FOUND, MESSAGES.USER_NOT_FOUND, false);
      res.status(STATUS.NOT_FOUND).json(response);
      return;
    }

    logger.info(`Deleted user: ${userId}`);
    const response = responseCreator(STATUS.OK, MESSAGES.USER_DELETED, true);
    res.status(STATUS.OK).json(response);
  } catch (error: any) {
    logger.error(`Error in deleteUser: ${error.message}`);
    const response = responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(response);
  }
};