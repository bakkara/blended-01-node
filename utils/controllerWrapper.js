const controllerWrapper = (controller) => {
  return async function (req, res, next) {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = controllerWrapper;

// const asyncWrapper = (controller) => {
//   return (req, res, next) => {
//     controller(req, res).catch(next);
//   };
// };
