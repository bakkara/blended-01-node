const { HttpError } = require("../utils/HttpError");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [type, accessToken] = authorization.split(" ");
  console.log(type);
  console.log(accessToken);

  if (type !== "Bearer" || !accessToken) {
    return next(new HttpError(401, "Invalid type or absent token"));
  }

  const { id: userId } = jwt.decode(accessToken);
  let user;
  try {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    user = await User.findById(userId);
    if (!user.refreshToken) {
      return next(new HttpError(401, "No refresh token"));
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name !== "TokenExpiredError") {
      return next(new HttpError(401, "Something went wrong"));
    }
    try {
      jwt.verify(user.refreshToken, REFRESH_TOKEN_SECRET);
      const { accessToken, refreshToken } = assignToken(user);
      await User.findByIdAndUpdate(userId, { refreshToken });
      res.json({ token: accessToken });
    } catch (error) {
      return next(new HttpError(401, "Invalid refreshToken"));
    }
  }
};

module.exports = authenticate;
