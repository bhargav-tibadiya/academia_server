// --> daily logs will be saved in logs folder in structured format
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const currentMonth = new Date().toLocaleDateString("en-GB", {
  month: "2-digit",
  year: "numeric",
}).replace("/", "-");

const logDir = path.join("logs", currentMonth);

const { combine, timestamp, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    customFormat
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(logDir, "error", "%DATE%.log"),
      datePattern: "DD-MM-YYYY",
      level: "error",
      maxFiles: "30d",
      zippedArchive: true,
    }),
    new DailyRotateFile({
      filename: path.join(logDir, "info", "%DATE%.log"),
      datePattern: "DD-MM-YYYY",
      level: "info",
      maxFiles: "30d",
      zippedArchive: true,
    }),
    new DailyRotateFile({
      filename: path.join(logDir, "combined", "%DATE%.log"),
      datePattern: "DD-MM-YYYY",
      maxFiles: "30d",
      zippedArchive: true,
    }),
  ],
});

export default logger;
