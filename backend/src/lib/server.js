// "use strict";

const cors = require("cors");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const compression = require("compression");
const fs = require("fs");
const url = require("url");
require("../config");
const apiRoute = require("../routes");

const app = express();

mongoose.Promise = Promise;

app.use(express.urlencoded({ extended: true }));
app.use("/packages", express.static(path.join(__dirname, "../../packages")));
app.use("/apps", function (req, res, next) {
  let uri = decodeURI(req.url);
  let filepath = path.join(__dirname, "../../apps", uri);
  console.log(filepath);
  let stream = fs.createReadStream(filepath);
  res.download(filepath);
});

app.use("/apps", express.static(path.join(__dirname, "../../apps")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json(), cors());
app.use(apiRoute);
app.use(compression());

console.log("MONGODB_URI", MONGODB_URI);
console.log("PORT", PORT);
console.log(path.join(__dirname, "../public"));
exports.start = () => {
  mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
    .then((result) => {
      app.listen(PORT, () => {
        console.log(
          "----------------Our server is started on port " +
            PORT +
            "-----------------"
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.stop = () => {
  app.close(PORT, () => {
    console.log(`Shut down on port: ${PORT}`);
  });
};
