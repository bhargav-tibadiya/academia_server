// Packages


// Model
import User from "@models/user.model";
import OTP from "@models/otp.model";


// Utils & Config
import logger from "@services/logger";
import { generateOtp, responseCreator } from "@utils/helpers";


// Types & Constant
import { LoginUserRequest, RegisterUserRequest, SendOTPRequest, ServerResponse } from "@interfaces/controllers";
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

    const isPasswordValid = await selectedUser.matchPassword(password);
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
  const { email, password, role, otp } = req.body;

  try {
    if (!email || !password || !role || !otp) {
      logger.warn(`${MESSAGES.MISSING_REQUIRED_FIELDS}: ${email}`);
      const response = responseCreator(STATUS.BAD_REQUEST, MESSAGES.MISSING_REQUIRED_FIELDS, false);
      res.status(STATUS.BAD_REQUEST).json(response);
      return
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`${MESSAGES.USER_ALREADY_EXISTS}: ${email}`);
      const response = responseCreator(STATUS.CONFLICT, MESSAGES.USER_ALREADY_EXISTS, false);
      res.status(STATUS.CONFLICT).json(response);
      return
    }

    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!recentOtp || recentOtp.otp !== otp) {
      logger.warn(`Invalid OTP for email: ${email}`);
      const response = responseCreator(STATUS.BAD_REQUEST, MESSAGES.INVALID_OTP, false);
      res.status(STATUS.BAD_REQUEST).json(response);
      return
    }

    const newUser = await User.create({ email, password, role });

    logger.info(`New user created: ${email}`);

    const response = responseCreator(STATUS.CREATED, MESSAGES.USER_CREATED, true, newUser);
    res.status(STATUS.CREATED).json(response);
    return
  } catch (error: any) {
    logger.error(`Error in registerUser: ${error.message}`);
    const response = responseCreator(STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR, false);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(response);
    return
  }
};

export const sendOTP: RequestHandler = async (req: SendOTPRequest, res: ServerResponse) => {
  const { email } = req.body;

  try {
    if (!email) {
      logger.warn(`Email is required`);
      res.status(STATUS.BAD_REQUEST).json({ success: false, message: "Email is required" });
      return
    }

    const user = await User.findOne({ email });
    if (user) {
      logger.warn(`User already exists: ${email}`);
      res.status(STATUS.CONFLICT).json({ success: false, message: "User already exists. Please login." });
      return
    }

    const otp = generateOtp(8)
    await OTP.create({ email, otp });

    logger.info(`OTP sent successfully to: ${email}`);
    res.status(STATUS.OK).json({ success: true, message: `OTP sent successfully, OTP : ${otp}` });
    return
  } catch (error: any) {
    logger.error(`Error in sendOTP: ${error.message}`);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error while sending OTP" });
    return
  }
};