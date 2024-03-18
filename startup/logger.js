const winston = require("winston");
const config = require("config");

if (!config.get("JWTPRIVATEKEY")) {
  throw new Error("FATAL ERROR : JWTPRIVATEKEY not defined");
}

if (!config.get("DB_AUTH")) {
  throw new Error("FATAL ERROR: DB_AUTH not defined");
}

if (!config.get("DB_USER")) {
  throw new Error("FATAL ERROR: DB_USER not defined");
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "logfile.log", level: "warn" }),
    new winston.transports.File({ filename: "infoLog.log", level: "info" }),
  ],
  exceptionHandlers: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "rejections.log" }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.simple()
  ),
});

module.exports.logger = logger;
