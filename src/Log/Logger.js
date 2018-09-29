import moment from 'moment';

class Logger {
  constructor(logger) {
    this.logger = logger;
  }

  info(message) {
    if (this.logger) {
      this.logger.log('info', `[${moment().format('YYYY-MM-DD HH:mm:ss')}] => ${message}`);
    }
  }

  debug(message) {
    if (this.logger) {
      this.logger.log('debug', `[${moment().format('YYYY-MM-DD HH:mm:ss')}] => ${message}`);
    }
  }

  warn(message) {
    if (this.logger) {
      this.logger.log('warn', `[${moment().format('YYYY-MM-DD HH:mm:ss')}] => ${message}`);
    }
  }

  error(message, error) {
    if (this.logger) {
      if (error) {
        this.logger.log(
          'error',
          `[${moment().format('YYYY-MM-DD HH:mm:ss')}] => ${message}:\n ${error.message}-${
            error.stack
          }`
        );
      } else {
        this.logger.log('error', `[${moment().format('YYYY-MM-DD HH:mm:ss')}] => ${message}`);
      }
    }
  }
}

export default Logger;
