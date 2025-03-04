import mongoose from "mongoose";
import { RequestHandler } from "express";

// Models
import Profile from "@models/profile.model";

// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";

// Types & Constants
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { ServerResponse } from "@interfaces/controllers";

// Get All Profiles & Get Profile By ID
export const getProfiles: RequestHandler = async (req, res: ServerResponse) => {
  const { profileId } = req.params;

  try {
    if (profileId) {
      if (!mongoose.Types.ObjectId.isValid(profileId)) {
        logger.warn(`Invalid ObjectId format: ${profileId}`);
        res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
        return;
      }

      const profile = await Profile.findById(profileId);
      if (!profile) {
        logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${profileId}`);
        res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
        return;
      }

      logger.info(`Fetched profile: ${profileId}`);
      res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, profile));
      return;
    }

    const profiles = await Profile.find();
    logger.info("Fetched all profiles");
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_FETCHED, true, profiles));
    return;
  } catch (error: any) {
    logger.error(`Error in getProfiles: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Create a Profile
export const createProfile: RequestHandler = async (req, res: ServerResponse) => {
  const profileData = req.body;

  try {
    const newProfile = await Profile.create(profileData);
    logger.info(`Created a new profile: ${newProfile._id}`);

    res.status(STATUS.CREATED).json(responseCreator(STATUS.CREATED, MESSAGES.DATA_CREATED, true, newProfile));
    return;
  } catch (error: any) {
    logger.error(`Error in createProfile: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Update a Profile
export const updateProfile: RequestHandler = async (req, res: ServerResponse) => {
  const { profileId } = req.params;
  const profileData = req.body;

  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    logger.warn(`Invalid ObjectId format: ${profileId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const updatedProfile = await Profile.findByIdAndUpdate(profileId, profileData, { new: true });

    if (!updatedProfile) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${profileId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Updated profile: ${profileId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_UPDATED, true, updatedProfile));
    return;
  } catch (error: any) {
    logger.error(`Error in updateProfile: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};

// Delete a Profile
export const deleteProfile: RequestHandler = async (req, res: ServerResponse) => {
  const { profileId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    logger.warn(`Invalid ObjectId format: ${profileId}`);
    res.status(STATUS.BAD_REQUEST).json(responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OBJECT_ID, false));
    return;
  }

  try {
    const deletedProfile = await Profile.findByIdAndDelete(profileId);

    if (!deletedProfile) {
      logger.warn(`${MESSAGES.RESOURCE_NOT_FOUND}: ${profileId}`);
      res.status(STATUS.NOT_FOUND).json(responseCreator(STATUS.NOT_FOUND, MESSAGES.RESOURCE_NOT_FOUND, false));
      return;
    }

    logger.info(`Deleted profile: ${profileId}`);
    res.status(STATUS.OK).json(responseCreator(STATUS.OK, MESSAGES.DATA_DELETED, true));
    return;
  } catch (error: any) {
    logger.error(`Error in deleteProfile: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false));
    return;
  }
};