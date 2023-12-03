const { HttpError } = require("./HttpError");

const validationWrapper = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new HttpError(406, `${error}`));
    }
    next();
  };
};

module.exports = validationWrapper;
