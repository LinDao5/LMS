const admins = require("../models/admins");

module.exports = (req, res, next) => {
  console.log("--------middleware Admin---------", req.body);
  const { token } = req.body;

  if (!token) {
    console.log("The request doesn't have token");
  } else {
    admins
      .findOne({
        token: token,
      })
      .then((result) => {
        console.log("result", result);
        if (result) {
          next();
        } else {
          console.log("no such token");
        }
      })
      .catch((err) => {
        console.log("adminMiddleware error");
      });
  }
};
