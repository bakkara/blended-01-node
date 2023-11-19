const notFoundHandler = (req, res, next) => {
  res
    .status(404)
    .json({
      message: "This route does not exist, please check the documentation",
    });
};

module.exports = notFoundHandler;
