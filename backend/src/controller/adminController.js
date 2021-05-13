const admins = require("../models/admins");
const users = require("../models/users");
const packages = require("../models/packages");
const apps = require("../models/apps");
const messages = require("../models/messages");
const payments = require("../models/payments");
const projects = require("../models/projects");
const requests = require("../models/requests");

require("../config");

const createToken = () => {
  var rand = function () {
    return Math.random().toString(36).substr(2); // remove `0.`
  };

  var token = function () {
    return rand() + rand(); // to make it longer
  };

  return token(); // "bnh5yzdirjinqaorq0ox1tf383nb3xr"
};

const getDateString = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  month++;
  console.log("month", month);
  var day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  var productPostTime = year + "-" + month + "-" + day;
  return productPostTime;
};

exports.signIn = (req, res) => {
  console.log("signIn admin");
  console.log(req.body);
  const { email, password } = req.body;
  admins
    .findOne({ email: email, password: password })
    .then((result) => {
      if (result) {
        console.log("success_signin");

        const token = createToken();

        result.token = token;
        result.signState = true;

        result.save().then((saveResult) => {
          console.log("new token was saved.");
          res.send({
            success: 1,
            message: "Signin success",
            user: saveResult,
          });
        });
      } else {
        console.log(
          "error_signup",
          "Email address or password is not incorrect."
        );
        res.send({
          success: 0,
          message: "Email address or password is not incorrect.",
        });
      }
    })
    .catch((error) => {
      console.log("error_signin", error);
      res.send({
        success: 0,
        message: error,
      });
    });
};

exports.signOut = (req, res) => {
  console.log("signOut admin");

  const { token } = req.body;
  admins
    .findOne({ token: token })
    .then((result) => {
      if (result) {
        result.save().then((saveResult) => {
          res.send({
            success: 1,
            message: "Signout success",
          });
        });
      } else {
        console.log("error_signout", "...");
        res.send({
          success: 0,
          message: "...",
        });
      }
    })
    .catch((error) => {
      console.log("error_signout", error);
      res.send({
        success: 0,
        message: error,
      });
    });
};

// exports.signUp = (req, res) => {
//   console.log("signOut admin");

//   console.log(req.body);
//   const { name, email, password } = req.body;
//   admins
//     .findOne({ email: "Vuxel" })
//     .then((result) => {
//       if (result) {
//         res.send({
//           success: 0,
//           message: "Same Email exists",
//         });
//       } else {
//         const token = createToken();

//         const newAdmin = new admins({
//           name: "Tiger",
//           email: email,
//           password: password,
//           token: token,
//           access: 0,
//         });

//         newAdmin
//           .save()
//           .then((saveResult) => {
//             console.log("sucecss_signup", saveResult);
//             res.send({
//               success: 1,
//               message: "Signup success",
//               user: saveResult,
//             });
//           })
//           .catch((saveError) => {
//             console.log("error_signup", saveError);
//             res.send({
//               success: 0,
//               message: saveError,
//             });
//           });
//       }
//     })
//     .catch((error) => {
//       console.log("error_signup", error);
//       res.send({
//         success: 0,
//         message: error,
//       });
//     });
// };

exports.getUsers = (req, res) => {
  console.log("getUsers admin");

  users
    .find()
    .then((result) => {
      res.send({
        success: 1,
        message: "get users success",
        users: result,
      });
    })
    .catch((error) => {
      console.log("error_get_users", error);
      res.send({
        success: 0,
        message: error,
      });
    });
};



exports.getSubmissions = async function (req, res) {
    console.log(req.body);
    const {token} = req.body;
    projects
        .find({})      //0:create, 1:finish, 2:pending&submitted,   //3:submitted  later
        .then((results) => {
            console.log("getSubmissions", results);

            res.send({
                res: 1,
                message: "Success",
                submissions: results,
            });
        })
        .catch((error) => {
            console.log("getSubmissions", error);
            res.send({
                res: 0,
                message: "Failed",
            });
        });
};



exports.getMessage = async function (req, res) {
    console.log(req.body);
    const {token} = req.body;
    requests
        .find({})      //0:create, 1:finish, 2:pending&submitted,   //3:submitted  later
        .then((results) => {
            console.log("getMessage", results);

            res.send({
                res: 1,
                message: "Success",
                messages: results,
            });
        })
        .catch((error) => {
            console.log("getMessage", error);
            res.send({
                res: 0,
                message: "Failed",
            });
        });
};



exports.addPackage = (req, res) => {
  console.log("addPackage admin");

  const rand = function () {
    return Math.random().toString(36).substr(2); // remove `0.`
  };

  const multer = require("multer");

  var packageFileUrl = "";
  var thumbnailFileUrl = "";

  const prefix = rand();

  var storage = multer.diskStorage({
    destination: "packages/",
    filename: function (req, file, cb) {
      console.log("file", file);

      if (file.fieldname === "packageFile") {
        packageFileUrl = "package-" + prefix + "-" + file.originalname;
        cb(null, packageFileUrl);
      } else {
        thumbnailFileUrl = "thumbnail-" + prefix + "-" + file.originalname;
        cb(null, thumbnailFileUrl);
      }
    },
  });

  var upload = multer({
    storage: storage,
  }).any();

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.end("Error");
    } else {
      console.log(req.body);

      const { packageName, packageDescription, packageFileSize } = req.body;

      const newPackage = new packages({
        packageName: packageName,
        packageDescription: packageDescription,
        packageFileSize: packageFileSize,
        packageFileUrl: packageFileUrl,
        thumbnailFileUrl: thumbnailFileUrl,
      });

      newPackage
        .save()
        .then(async (result) => {
          console.log("result", result);
          const _packages = await packages.find().find();
          res.send({
            success: 1,
            message: "upload success",
            packages: _packages,
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  });
};

exports.addApp = (req, res) => {
  console.log("addApp admin");

  const rand = function () {
    return Math.random().toString(36).substr(2); // remove `0.`
  };

  const multer = require("multer");

  var appFileUrl = "";

  const prefix = rand();

  var storage = multer.diskStorage({
    destination: "apps/",
    filename: function (req, file, cb) {
      console.log("file", file);

      appFileUrl = "app-" + prefix + "-" + file.originalname;
      cb(null, appFileUrl);
    },
  });

  var upload = multer({
    storage: storage,
  }).any();

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.end("Error");
    } else {
      console.log(req.body);

      const { appVersion, appDescription, appFileSize } = req.body;

      const newApp = new apps({
        appVersion: appVersion,
        appDescription: appDescription,
        appFileSize: appFileSize,
        appFileUrl: appFileUrl,
        updatedAt: getDateString(),
      });

      newApp
        .save()
        .then(async (result) => {
          console.log("result", result);
          const _apps = await apps.find().find();
          res.send({
            success: 1,
            message: "upload success",
            apps: _apps,
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  });
};

exports.getPackages = (req, res) => {
  console.log("getPackages admin");

  packages
    .find()
    .then((result) => {
      res.send({
        success: 1,
        message: "get packages success",
        packages: result,
      });
    })
    .catch((error) => {
      console.log("error get packages", error);
      res.send({
        success: 0,
        message: error,
      });
    });
};

exports.getApps = (req, res) => {
  console.log("getApps admin");

  apps
    .find()
    .then((result) => {
      res.send({
        success: 1,
        message: "get apps success",
        apps: result,
      });
    })
    .catch((error) => {
      console.log("error get packages", error);
      res.send({
        success: 0,
        message: error,
      });
    });
};
//
// exports.getMessages = (req, res) => {
//   console.log("getMessages admin");
//
//   messages
//     .find()
//     .then((result) => {
//       res.send({
//         success: 1,
//         message: "get messages success",
//         messages: result,
//       });
//     })
//     .catch((error) => {
//       console.log("error get messages", error);
//       res.send({
//         success: 0,
//         message: error,
//       });
//     });
// };

exports.getPayments = (req, res) => {
  console.log("getPayments admin");

  payments
    .find()
    .then((result) => {
      res.send({
        success: 1,
        message: "get payments success",
        payments: result,
      });
    })
    .catch((error) => {
      console.log("error get payments", error);
      res.send({
        success: 0,
        message: error,
      });
    });
};
