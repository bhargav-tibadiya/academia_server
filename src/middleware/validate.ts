// Utils and Services
import { responseCreator } from "@utils/helpers";
import logger from "@services/logger";

// Validator
import Validators from "@utils/validator/validator";

// Const & Types
import { Request, Response, NextFunction } from "express";
import { STATUS } from "@utils/constants/status";


const validatePayload = (schemaKey: keyof typeof Validators) => {
  const schema = Validators[schemaKey]
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      logger.warn(`Validation Error: ${error.details.map((err) => err.message).join(", ")}`);
      const response = responseCreator(STATUS.BAD_REQUEST, "Invalid payload", false, {
        errors: error.details.map((err) => err.message),
      });
      res.status(STATUS.BAD_REQUEST).json(response);
      return
    }

    next();
  };
};

export default validatePayload;
