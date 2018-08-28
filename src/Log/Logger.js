import moment from "moment";

class Logger {
	constructor(logger) {
		this._logger = logger;
	}

	info(message) {
		if (this._logger) {
			this._logger.log(
				"info",
				`[${moment().format("YYYY-MM-DD HH:mm:ss")}] => ${message}`
			);
		}
	}

	debug(message) {
		if (this._logger) {
			this._logger.log(
				"debug",
				`[${moment().format("YYYY-MM-DD HH:mm:ss")}] => ${message}`
			);
		}
	}

	warn(message) {
		if (this._logger) {
			this._logger.log(
				"warn",
				`[${moment().format("YYYY-MM-DD HH:mm:ss")}] => ${message}`
			);
		}
	}

	error(message, error) {
		if (this._logger) {
			if (error) {
				this._logger.log(
					"error",
					`[${moment().format(
						"YYYY-MM-DD HH:mm:ss"
					)}] => ${message}:\n ${error.message}-${error.stack}`
				);
			} else {
				this._logger.log(
					"error",
					`[${moment().format("YYYY-MM-DD HH:mm:ss")}] => ${message}`
				);
			}
		}
	}
}

export default Logger;
