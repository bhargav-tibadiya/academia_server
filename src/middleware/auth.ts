// Packages
import jwt from 'jsonwebtoken';

// Utils & Services
import { responseCreator } from '@utils/helpers';
import logger from '@services/logger';

// Types & Constants
import { Request, Response, NextFunction } from 'express';
import { STATUS } from '@utils/constants/status';

// Define allowed roles
type Role = 'student' | 'teacher' | 'admin';

// Middleware to validate user
export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1] || req.body.token || req.cookies.token;

  if (!token) {
    logger.warn('No token provided');
    const response = responseCreator(STATUS.UNAUTHORIZED, 'Authorization token is missing', false);
    res.status(STATUS.UNAUTHORIZED).json(response);
    return
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
    next();
  } catch (error: any) {
    // Handle errors (e.g., invalid or expired token)
    logger.error('Token validation failed: ', error.message);
    const response = responseCreator(STATUS.UNAUTHORIZED, 'Invalid or expired token', false);
    res.status(STATUS.UNAUTHORIZED).json(response);
    return
  }
};

// Middleware to validate token and role
export const validateRole = (role: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {

    // Retrieve the token from different possible sources: header, body, cookies
    const token = req.headers['authorization']?.split(' ')[1] || req.body.token || req.cookies.token;

    // If no token is provided, return an error
    if (!token) {
      logger.warn('No token provided');
      const response = responseCreator(STATUS.UNAUTHORIZED, 'Authorization token is missing', false);
      res.status(STATUS.UNAUTHORIZED).json(response);
      return
    }

    try {
      // Decode the JWT token using a secret key (it should be the same secret you use for signing tokens)
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');

      // Check if the decoded token contains the role and if it's the correct one
      if (!decoded.role || !['student', 'teacher', 'admin'].includes(decoded.role)) {
        logger.warn(`Invalid role: ${decoded.role}`);
        const response = responseCreator(STATUS.FORBIDDEN, 'Invalid role in the token', false);
        res.status(STATUS.FORBIDDEN).json(response);
        return
      }

      // If the role in the token matches the required role, proceed
      if (decoded.role === 'teacher' && role === 'student') {
        // If the user is a teacher, they can perform 'student' actions
        next();
        return;
      }

      if (decoded.role === 'admin') {
        // If the user is an admin, they can perform any action
        next();
        return;
      }

      if (decoded.role === role) {
        // If the role in the token matches the required role, proceed
        next();
        return;
      }

      // If the role doesn't match, deny access
      logger.warn(`Unauthorized access for role: ${decoded.role}`);
      const response = responseCreator(STATUS.FORBIDDEN, 'You do not have permission to access this resource', false);
      res.status(STATUS.FORBIDDEN).json(response);
      return;
    } catch (error: any) {
      logger.error(`Token validation failed: ${error.message}`);
      const response = responseCreator(STATUS.UNAUTHORIZED, 'Invalid or expired token', false);
      res.status(STATUS.UNAUTHORIZED).json(response);
      return
    }
  };
};