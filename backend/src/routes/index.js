const api = require("./api");

const express = require("express");

//middleware
const userMiddleware = require("../middleware/userMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

//controller
const userController = require("../controller/userController");
const adminController = require("../controller/adminController");

const router = express.Router();

// test api
router.post(api.TEST, userController.apiTest);

// user api
router.post(api.USER.REGISTER, userController.register);
router.post(api.USER.LOGIN, userController.login);
router.post(api.USER.SIGNOUT, userController.signOut);
router.post(api.USER.VERIFY, userController.verify);
router.post(api.USER.CREATE_PROJECT, userController.createProject);
router.post(api.USER.GET_STUDENT, userController.getStudent);
router.post(api.USER.GET_UPCOMING_PROJECT, userController.getUpcomingProject);
router.post(api.USER.GET_PREVIOUS_PROJECT, userController.getPreviousProjects);
router.post(api.USER.GET_UPCOMING_SUBMISSION, userController.upcomingSubmission);
router.post(api.USER.GET_REQUEST_SUPERVISOR, userController.getRequestSupervisor);
router.post(api.USER.GET_REQUEST_MEETING, userController.requestMeeting);
router.post(api.USER.GET_IDEAS, userController.getIdeas);
router.post(api.USER.REQUEST_SUPERVISION, userController.requestSupervision);
router.post(api.USER.GET_MY_PROJECT, userController.getMyProject);
router.post(api.USER.GET_MY_SUBMISSION, userController.getMySubmission);


////////////////////////supervisor//////////////////////
router.post(api.USER.GET_LATEST_PROJECT, userController.getLatestSubmission);
router.post(api.USER.GET_IDEA_WITH_SUPERVISOR, userController.getIdeasWithSupervisor);
router.post(api.USER.EDIT_IDEA, userController.editIdea);
router.post(api.USER.CREATE_IDEA, userController.createIdea);
router.post(api.USER.GET_MESSAGE_COUNT, userController.getMessageCount);
router.post(api.USER.GET_MESSAGE, userController.getMessage);
router.post(api.USER.ACCEPT_REQUEST, userController.acceptRequest);
router.post(api.USER.INACTIVE_REQUEST, userController.setInActiveRequest);
router.post(api.USER.SET_GRADE, userController.setGrade);
router.post(api.USER.SET_DONE, userController.setDone);

router.post(api.USER.GET_PACKAGES, userMiddleware, userController.getPackages);

router.post(api.USER.GET_APP, userMiddleware, userController.getApp);

router.post(api.USER.SEND_MESSAGE, userController.sendMessage);

router.post(api.USER.PAY, userMiddleware, userController.pay);

// admin api
router.post(api.ADMIN.SIGNIN, adminController.signIn);
router.post(api.ADMIN.SIGNOUT, adminMiddleware, adminController.signOut);
router.post(api.ADMIN.GET_USERS, adminMiddleware, adminController.getUsers);
router.post(api.ADMIN.GET_SUBMISSION, adminMiddleware, adminController.getSubmissions);
router.post(api.ADMIN.GET_MESSAGE, adminMiddleware, adminController.getMessage);


router.post(api.ADMIN.ADD_PACKAGE, adminController.addPackage);
router.post(
  api.ADMIN.GET_PACKAGES,
  adminMiddleware,
  adminController.getPackages
);

router.post(api.ADMIN.ADD_APP, adminController.addApp);
router.post(api.ADMIN.GET_APPS, adminMiddleware, adminController.getApps);

// router.post(
//   api.ADMIN.GET_MESSAGES,
//   adminMiddleware,
//   adminController.getMessages
// );

router.post(
  api.ADMIN.GET_PAYMENTS,
  adminMiddleware,
  adminController.getPayments
);

module.exports = router;
