import winston from "winston";
import Logger from "./Logger";

class LogManager {
	constructor() {
		this._logger = new Logger(this._initFileLogger());

		this._console = new Logger(this._initConsoleLogger());
	}

	_initFileLogger() {
		return winston.createLogger({
			levels: winston.config.syslog.levels,
			transports: [
				new winston.transports.File({
					filename: "crud.log",
					maxsize: 2097152,
					maxFiles: 10,
					timestamp: true,
					zippedArchive: true,
					label: "CRUD"
				})
			]
		});
	}

	_initConsoleLogger() {
		return winston.createLogger({
			levels: winston.config.syslog.levels,
			transports: [new winston.transports.Console()]
		});
	}

	getLogger() {
		return this._logger;
	}

	getConsole() {
		return this._console;
	}
}

const manager = new LogManager();

export default manager;
