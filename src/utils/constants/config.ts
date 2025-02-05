// Utils & Services
import logger from "@services/logger";
import { responseCreator } from "@utils/helpers";


// Const and Types
import { NextFunction, Request, Response } from "express";
import { Options } from "express-rate-limit";
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";


export const rateLimiterConfig = {
  windowMs: 10 * 60 * 1000,                                                // 10 minutes Time window when the limit resets 
  max: 500,                                                                // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,                                                   // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,
  handler: (req: Request, res: Response, next: NextFunction, options: Options) => {

    const resetTime = Math.ceil((options.windowMs - (Date.now() % options.windowMs)) / 1000); // In Seconds
    const remainingRequests = res.getHeader('X-RateLimit-Remaining');
    const limit = options.max;
    const payload = {
      limit,
      remainingRequests: remainingRequests || 0,
      resetTime,
      windowMs: options.windowMs / 1000
    }

    const response = responseCreator(STATUS.TOO_MANY_REQUESTS, MESSAGES.TOO_MANY_REQUESTS, false, payload);

    logger.warn(`Rate limit exceeded for IP: ${req.ip}`)
    res.status(STATUS.TOO_MANY_REQUESTS).json(response);
  }
};