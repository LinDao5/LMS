const users = require("../models/users");

module.exports = (req, res, next) => {
  console.log("--------middleware User---------", req.body);
  const { token } = req.body;

  if (!token) {
    console.log("The request doesn't have token");
  } else {
    users
      .findOne({
        token: token,
      })
      .then((result) => {
        console.log("result", result);
        if (result) {
          next();
        } else {
          console.log("invalid token");
          res.send({
            success: 0,
            message: "invalid token",
          });
        }
      })
      .catch((err) => {
        console.log("userMiddleware error");
        res.send({
          success: 0,
          message: "user middleware error",
        });
      });
  }
};
