const HttpErrorMessages = require("../const/HttpErrorMessages");

class HttpError extends Error {
  constructor(
    statusCode = 500,
    message = HttpErrorMessages[statusCode] || HttpErrorMessages.default
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = HttpError;
