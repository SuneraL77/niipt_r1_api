import createHttpError from "http-errors";
import jwt from "jsonwebtoken";


export const authMidllware = async (req, res, next) => {
  console.log(req.headers["authorization"])
  if (!req.headers["authorization"])
    return next(createHttpError.Unauthorized());
  const berareToken = req.headers["authorization"];
  const token = berareToken.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return next(createHttpError.Unauthorized());
    }
    req.user = payload;
    console.log(req.user)
    next();
  });
};
