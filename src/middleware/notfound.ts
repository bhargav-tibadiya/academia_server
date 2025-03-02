// notFoundMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { STATUS } from "@utils/constants/status";
import { MESSAGES } from "@utils/constants/message";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(STATUS.NOT_FOUND).json({
    success: false,
    message: `${req.method} ${req.originalUrl} ${MESSAGES.ROUTE_NOT_FOUND}`,
  });
};

export default notFoundHandler;
