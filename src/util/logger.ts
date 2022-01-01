import ecsFormat from "@elastic/ecs-winston-format";
import winston from "winston";

const logger = winston.createLogger({
  format: ecsFormat(),
  level: "info",
  transports: [new winston.transports.Console()],
});

export default logger;
