// Packages


// Model
import User from "@models/user.model";


// Utils & Config
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";


// Types & Constant
import { LoginUserRequest, RegisterUserRequest, ServerResponse } from "@interfaces/controllers";
import { MTUser } from "@interfaces/models/index";
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";
import { RequestHandler } from "express";


export const loginUser: RequestHandler = async (req: LoginUserRequest, res: ServerResponse) => {
  const { email, password } = req.body;

  try {
    const isPayloadValid = (!!email || !!password)
    if (!isPayloadValid) {
      logger.warn(`${MESSAGES.MISSING_REQUIRED_FIELDS}: ${email}`);
      const response = responseCreator(STATUS.BAD_REQUEST, MESSAGES.MISSING_REQUIRED_FIELDS, false)
      res.status(STATUS.BAD_REQUEST).json(response);
      return;
    }

    const selectedUser = await User.findOne({ email }).select('+password') as MTUser;
    if (!selectedUser) {
      logger.warn(`${MESSAGES.USER_NOT_FOUND}: ${email}`);
      const response = responseCreator(STATUS.CONFLICT, MESSAGES.USER_NOT_FOUND, false)
      res.status(STATUS.CONFLICT).json(response);
      return;
    }

    const isPasswordValid = selectedUser.matchPassword(password);
    if (!isPasswordValid) {
      logger.warn(`Invalid password attempt for email: ${email}`);
      const response = responseCreator(STATUS.UNAUTHORIZED, MESSAGES.PASSWORD_MISMATCH, false)
      res.status(STATUS.UNAUTHORIZED).json(response);
      return;
    }

    const token = selectedUser.getSignedToken()
    const userInfoWithToken = { ...selectedUser.toJSON(), token: token }

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    };

    logger.info(`User logged in successfully: ${email}`);
    const response = responseCreator(STATUS.OK, MESSAGES.USER_AUTHENTICATED, true, userInfoWithToken)
    res.status(STATUS.OK).cookie('token', token, cookieOptions).json(response);

  } catch (error: any) {
    logger.error(`Error in loginUser: ${error.message}`);
    const response = responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false)
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(response);
  }
};

export const registerUser: RequestHandler = async (req: RegisterUserRequest, res: ServerResponse) => {
  const { email, password, role } = req.body;

  try {
    const isPayloadValid = (!!email || !!password || !!role)
    if (!isPayloadValid) {
      logger.warn(`${MESSAGES.MISSING_REQUIRED_FIELDS}: ${email}`);
      const response = responseCreator(STATUS.BAD_REQUEST, MESSAGES.MISSING_REQUIRED_FIELDS, false)
      res.status(STATUS.BAD_REQUEST).json(response);
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`${MESSAGES.USER_ALREADY_EXISTS}: ${email}`);
      const response = responseCreator(STATUS.CONFLICT, MESSAGES.USER_ALREADY_EXISTS, false)
      res.status(STATUS.CONFLICT).json(response);
      return;
    }

    const payload = { email, password, role }
    const newUser = await User.create(payload);
    logger.info(`New user created: ${email}`);
    const response = responseCreator(STATUS.CREATED, MESSAGES.USER_AUTHENTICATED, true, newUser)
    res.status(STATUS.CREATED).json(response);

  } catch (error: any) {
    logger.error(`Error in loginUser: ${error.message}`);
    const response = responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false)
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(response);
  }
};