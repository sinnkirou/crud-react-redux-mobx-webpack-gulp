import winston from 'winston';
import Logger from './Logger';

function initFileLogger() {
  return winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [
      new winston.transports.File({
        filename: 'crud.log',
        maxsize: 2097152,
        maxFiles: 10,
        timestamp: true,
        zippedArchive: true,
        label: 'CRUD'
      })
    ]
  });
}

function initConsoleLogger() {
  return winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [new winston.transports.Console()]
  });
}

class LogManager {
  constructor() {
    this.logger = new Logger(initFileLogger());

    this.console = new Logger(initConsoleLogger());
  }

  getLogger() {
    return this.logger;
  }

  getConsole() {
    return this.console;
  }
}

const manager = new LogManager();

export default manager;
