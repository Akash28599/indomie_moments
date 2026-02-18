import winston from "winston";
import { config } from "../config/env";

const format = config.isProduction
  ? winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json()
    )
  : winston.format.combine(
      winston.format.timestamp({ format: "HH:mm:ss" }),
      winston.format.colorize(),
      winston.format.printf(({ level, message, timestamp, ...meta }) => {
        const metaStr = Object.keys(meta).length ? " " + JSON.stringify(meta) : "";
        return `${timestamp} [${level}]: ${message}${metaStr}`;
      })
    );

const logger = winston.createLogger({
  level: config.isDevelopment ? "debug" : "info",
  format,
  defaultMeta: { service: "indomie-moments-api" },
  transports: [new winston.transports.Console()],
});

export { logger };
