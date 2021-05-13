const users = require("../models/users");
const students = require("../models/students");
const supervisors = require("../models/supervisors");
const projects = require("../models/projects");
const stuprojects = require("../models/stuProjects");
const ideas = require("../models/ideas");
const packages = require("../models/packages");
const apps = require("../models/apps");
const messages = require("../models/messages");
const payments = require("../models/payments");
const requests = require("../models/requests");

var nodemailer = require("nodemailer");

require("../config");

exports.register = (req, res) => {
    console.log("register user", req.body);

    const {firstName, lastName, email, phoneNumber, department, password, role} = req.body;
    users
        .findOne({email: email})
        .then(async (result) => {
            if (result) {
                res.send({
                    res: 0,
                    message: "Same Email exists",
                });
            } else {
                // email verfication
                const verificationToken = createToken();
                const name = firstName + lastName;
                console.log("registerName", name);
                const newUser = new users({
                    first_name: firstName,
                    last_name: lastName,
                    name: name,
                    email: email,
                    phone_number: phoneNumber,
                    department: department,
                    password: password,
                    token: verificationToken,
                    role: role,
                    register_date: new Date(),
                    login_date: new Date(),
                });

                newUser
                    .save()
                    .then((saveResult) => {
                        console.log("sucecss_signup", saveResult);
                        res.send({
                            res: 1,
                            message: "Email sent! Please verify your email",
                            user: saveResult,
                        });
                        if (role == 0) {
                            const newStudent = new students({
                                user_id: saveResult._id,
                                email: saveResult.email
                            });
                            newStudent
                                .save()
                                .then((saveResult) => {
                                    console.log("register student", saveResult);
                                })
                                .catch((saveError) => {
                                    console.log("register student", saveError);
                                });
                        } else if (role == 1) {
                            const newSupervisor = new supervisors({
                                user_id: saveResult._id,
                                email: saveResult.email
                            });
                            newSupervisor
                                .save()
                                .then((saveResult) => {
                                    console.log("register_supervisor", saveResult);
                                })
                                .catch((saveError) => {
                                    console.log("register_supervisor", saveError);
                                });
                        }
                    })
                    .catch((saveError) => {
                        console.log("error_signup", saveError);
                        res.send({
                            res: 0,
                            message: saveError,
                        });
                    });

                // var mailMessage = {
                //   from: "info@relationshipstatusfinder.com",
                //   to: email,
                //   subject: "Rip Core Verification of email",
                //   html: `<h1>Hello ${name}</h1>
                //   <p>Please click to verify your email</p>
                //   <p>http://ripcore.gg:8000/verification?verificationToken=${verificationToken}</p>`,
                // };
                //
                // transporter.sendMail(mailMessage, function (error, data) {
                //   if (error) {
                //     console.log("Email send error", error);
                //     res.send({
                //       success: 0,
                //       message: "Email is not valid",
                //     });
                //   } else {
                //     console.log("Email sent: " + data.response);
                //     const newUser = new users({
                //       name: name,
                //       email: email,
                //       password: password,
                //       token: "",
                //       signState: false,
                //       membership: 0,
                //       verificationToken: verificationToken,
                //       signUpDate: getDateString(),
                //       signInDate: getDateString(),
                //       membershipStartDate: new Date(),
                //       membershipEndDate: new Date(),
                //     });
                //
                //     newUser
                //       .save()
                //       .then((saveResult) => {
                //         console.log("sucecss_signup", saveResult);
                //         res.send({
                //           success: 1,
                //           message: "Email sent! Please verify your email",
                //         });
                //       })
                //       .catch((saveError) => {
                //         console.log("error_signup", saveError);
                //         res.send({
                //           success: 0,
                //           message: saveError,
                //         });
                //       });
                //   }
                // });
            }
        })
        .catch((error) => {
            console.log("error_signup", error);
            res.send({
                res: 0,
                message: error,
            });
        });
};

exports.login = (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
    users
        .findOne({email: email, password: password})
        .then((result) => {
            if (result) {
                console.log("success_signin");

                const token = createToken();

                result.token = token;
                result.login_date = new Date();

                result.save().then((saveResult) => {
                    console.log("new token was saved.");
                    res.send({
                        res: 1,
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
                    res: 0,
                    message: "Email address or password is not incorrect.",
                });
            }
        })
        .catch((error) => {
            console.log("error_signin", error);
            res.send({
                res: 0,
                message: error,
            });
        });
};

exports.signOut = (req, res) => {
    console.log("user siginout");
    const {token} = req.body;
    users
        .findOne({token: token})
        .then((result) => {
            if (result) {
                result.signState = false;

                result.save().then((saveResult) => {
                    res.send({
                        success: 1,
                        message: "Signout success",
                        user: saveResult,
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


exports.getStudent = (req, res) => {
    console.log(req.body);
    const {token} = req.body;

    users
        .find({role: 0})
        .then((result) => {
            console.log("get_student", result);
            res.send({
                res: 1,
                message: "Success",
                students: result,
            });
        })
        .catch((error) => {
            console.log("get_student_error", error);
            res.send({
                res: 0,
                message: "Failed",
            });
        });

};

exports.getPreviousProjects = (req, res) => {
    console.log(req.body);
    const {token} = req.body;

    projects
        .find({"isPrevious": 1})
        .then((results) => {
            console.log("getPreviousProjectsSuccess", results);
            res.send({
                res: 1,
                message: "Success",
                previousProject: results,
            });
        })
        .catch((error) => {
            console.log("getPreviousProjectsError", error);
        });

};


exports.getUpcomingProject = async function (req, res) {
    console.log(req.body);
    const {token} = req.body;
    const user = await getUserWithToken(token);
    console.log("get_upcoming_project_user", user);
    const studentId = await getStudentIdWithUser(user._id)._id;
    console.log("get_upcoming_project_user_id", studentId);
    projects
        .find({"isPrevious": 0})
        .then((results) => {
            console.log("get_upcoming_project", results);
            // var filterProject = [];
            // results.map(async (item, index) => {
            //     const count = await getSubmissionCountWithUser(item._id, studentId);
            //     console.log("get_upcoming_project_count", count);
            //     if (count > 0) {
            //         console.log("get_upcoming_project_count_index", results[index]);
            //     } else {
            //         console.log("get_upcoming_project_count_index<0", results[index]);
            //         filterProject.push(results[index]);
            //         console.log("get_upcoming_project_success_filter__", filterProject);
            //     }
            // });
            // console.log("get_upcoming_project_success_filter_s", filterProject); //todo not get values
            res.send({
                res: 1,
                message: "Success",
                upcomeProject: results,
            });
        })
        .catch((error) => {
            console.log("get_upcoming_project", error);
            res.send({
                res: 0,
                message: "Failed",
            });
        });
};

exports.upcomingSubmission = (req, res) => {
    console.log(req.body);
    const {token, projectIds} = req.body;
    console.log("upcoming_submission", projectIds);
    console.log("upcoming_submission_length", projectIds.length);
    users
        .findOne({token: token})
        .then((user) => {
            students
                .findOne({user_id: user._id})
                .then((stu) => {
                    console.log("upcoming_submission_students", stu);
                    projectIds.map((id, index) => {
                        console.log("id", id);
                        projects.updateOne(
                            {"_id": id},
                            {
                                $set: {
                                    "studentId": stu._id,
                                    "isPrevious": 2,                    //means pending,
                                }
                            },
                        )
                            .then((result) => {
                                console.log("upcomingSubmissionSuccess", result);
                            })
                            .catch((error) => {
                                console.log("upcomingSubmissionError", error);
                            });
                        // const nStuProjects = new stuprojects({
                        //     studentId: stu._id,
                        //     projectId: id
                        // });
                        // nStuProjects
                        //     .save()
                        //     .then((result) => {
                        //         console.log("upcoming_submission_stuproject_suceess", result);
                        //     })
                        //     .catch(error => {
                        //         console.log("upcoming_submission_stuproject_error", error);
                        //     });
                    });
                })
                .catch((error) => {
                    console.log("upcoming_submission_student_error", error);
                });
        })
        .catch((error) => {

        });

};

exports.getRequestSupervisor = (req, res) => {
    const {token, searchTxt} = req.body;
    console.log("getRequestSupervisorget", "token:", token, ", searchText", searchTxt);
    users
        .find({"role": 1})
        .then((result) => {
            console.log("getRequestSupervisorSuccess", result);
            res.send({
                res: 1,
                message: "success",
                requestSupervisor: result
            })
        })
        .catch((error) => {
            res.send({
                res: 0,
                message: "Failed",
            });
            console.log("getRequestSupervisorError", error);
        });
};

exports.requestMeeting = (req, res) => {
    console.log("requestMeetingsss", req.body);
    const {token, supervisorIds, message} = req.body;
    console.log("requestMeeting", supervisorIds, ",token", token, ",message: ", message);
    console.log("requestMeetingLength", supervisorIds.length);

    users
        .findOne({token: token})
        .then((user) => {
            students
                .findOne({user_id: user._id})
                .then((stu) => {
                    console.log("requestMeetingStudents", stu);
                    supervisorIds.map((id, index) => {
                        supervisors
                            .findOne({user_id: id})
                            .then((supervis) => {
                                const nReqeust = new requests({
                                    studentId: stu._id,
                                    supervisorId: supervis._id,
                                    email: stu.email,
                                    message: message,
                                    isStudentActive: 0,
                                    isSupervisorActive: 1,
                                    isAccepted: 0             //0 none, 1 accepted 2 deny
                                });
                                nReqeust
                                    .save()
                                    .then((result) => {
                                        console.log("requestMeetingSuccess", result);
                                        res.send({
                                            res: 1,
                                            message: "Success",
                                        });
                                    })
                                    .catch(error => {
                                        console.log("upcoming_submission_stuproject_error", error);
                                    });
                            })
                            .then((error) => {
                               console.log("requestMeetingFindSupervisor:", error);
                            });
                        console.log("id", id);

                    });
                })
                .catch((error) => {
                    console.log("requestMeetingError", error);
                });
        })
        .catch((error) => {
            console.log("requestMeetingError", error);
        });

};


exports.getIdeas = (req, res) => {
    const {token, supervisorId} = req.body;
    console.log("getIdeas", "supervisor_id:", supervisorId, ", token:", token);
    ideas
        .find({"supervisor_id": supervisorId})
        .then((result) => {
            console.log("getideasSuccess", result);
            res.send({
                res: 1,
                message: "success",
                ideas: result
            })
        })
        .catch((error) => {
            res.send({
                res: 0,
                message: "Failed",
            });
            console.log("getRequestSupervisorError", error);
        });
};


exports.requestSupervision = (req, res) => {
    const {token, projectId, selectedIdea} = req.body;
    console.log("requestSupervision", "projectId:", projectId, ", token:", token, ", selectedIdea:", selectedIdea);
    users
        .findOne({token: token})
        .then((user) => {
            students
                .findOne({user_id: user._id})
                .then((stu) => {
                    console.log("requestSupervision studnetId", stu._id);
                    projects.updateOne(
                        {"_id": projectId},
                        {
                            $set: {
                                "studentId": stu._id,
                                "isPrevious": 2,                    //means pending,
                                "idea": selectedIdea
                            }
                        },
                    )
                        .then((result) => {
                            console.log("requestSupervisionSuccess", result);
                            res.send({
                                res: 1,
                                message: "Success",
                            });
                        })
                        .catch((error) => {
                            res.send({
                                res: 0,
                                message: "Fail",
                            });
                            console.log("requestSupervisionError", error);
                        });
                })
                .catch((error) => {
                    console.log("requestSupervision", error);
                });
        })
        .catch((error) => {

        });
};


exports.getMyProject = async function (req, res) {
    console.log(req.body);
    const {token} = req.body;
    const user = await getUserWithToken(token);
    console.log("getMyProjectUser", user);
    const supervisor = await getSupervisorIdWithUser(user._id);
    const supervisorId = supervisor._id;
    console.log("getMyProjectUserId", supervisorId);
    projects
        .find({"supervisor_id": supervisorId})      //0:create, 1:finish, 2:pending&submitted,   //3:submitted  later
        .then((results) => {
            console.log("getMyProjectUserSuccess", results);

            res.send({
                res: 1,
                message: "Success",
                myProject: results,
            });
        })
        .catch((error) => {
            console.log("getMyProjectUserError", error);
            res.send({
                res: 0,
                message: "Failed",
            });
        });
};


exports.getMySubmission = async function (req, res) {
    console.log(req.body);
    const {token} = req.body;
    const user = await getUserWithToken(token);
    console.log("getMySubmissionUser", user);
    if (user === null){
        res.send({
            res: 1,
            message: "No User.",
            mySubmission: "",
        });
    } else {
        const student = await getStudentIdWithUser(user._id);
        const studentId = student._id;
        console.log("getMySubmissionStudent", student);
        projects
            .find({"studentId": studentId})      //0:create, 1:finish, 2:pending&submitted,   //3:submitted  later
            .then((results) => {
                console.log("getMySubmissionSuccess", results);

                res.send({
                    res: 1,
                    message: "Success",
                    mySubmission: results,
                });
            })
            .catch((error) => {
                console.log("get_upcoming_project", error);
                res.send({
                    res: 0,
                    message: "Failed",
                });
            });
    }

};


////////////////////////////////supervisor///////////////////////////////////

exports.getLatestSubmission = async function (req, res) {
    console.log(req.body);
    const {token} = req.body;
    const user = await getUserWithToken(token);
    console.log("getLatestSubmissionuser", user);
    const supervisor = await getSupervisorIdWithUser(user._id);
    const supervisorId = supervisor._id;
    console.log("getLatesteSubmission_supervisorId", supervisorId);
    projects
    //     .aggregate([
    //         // {
    //         //     "$match": {
    //         //         "isPrevious": 2,
    //         //         // "supervisor_id": supervisorId
    //         //     }
    //         // },
    //         {
    //             "$lookup": {
    //                 "from": "students",
    //                 "localField": "studentId",
    //                 "foreignField": "_id",
    //                 "as": "students"
    //             }
    //         }
    //     ]).exec((err, locations) => {
    //     if (err) {
    //         console.log("getLatestSubmissionError", err);
    //     }
    //     console.log("getLatestSubmissionSuccess", locations);
    // })
        .find({"isPrevious": {$gt: 0}, "supervisor_id": supervisorId})      //0:create, 1:finish, 2:pending&submitted,   //3:submitted  later
        .then((results) => {
            console.log("getLatestSubmissionSuccess", results);

            res.send({
                res: 1,
                message: "Success",
                latestSubmissions: results,
            });
        })
        .catch((error) => {
            console.log("get_upcoming_project", error);
            res.send({
                res: 0,
                message: "Failed",
            });
        });
};

exports.getIdeasWithSupervisor = async function (req, res) {
    const {token} = req.body;
    console.log("getIdeas", ", token:", token);
    const user = await getUserWithToken(token);
    console.log("getIdeasWithSupervisor", user);
    const supervisor = await getSupervisorIdWithUser(user._id);
    const supervisorId = supervisor._id;
    console.log("getIdeasWithSupervisor", supervisorId);
    ideas
        .find({"supervisor_id": supervisorId})
        .then((result) => {
            console.log("getIdeasWithSupervisorSuccess", result);
            res.send({
                res: 1,
                message: "success",
                ideas: result
            })
        })
        .catch((error) => {
            res.send({
                res: 0,
                message: "Failed",
            });
            console.log("getIdeasWithSupervisorError", error);
        });
};


exports.editIdea = async function (req, res) {
    const {token, ideaId, idea} = req.body;
    console.log("editIdeaData", "ideaId:", ideaId, ", token:", token, ", idea:", idea);

    ideas.updateOne(
        {"_id": ideaId},
        {
            $set: {
                "idea": idea,
            }
        }
    )
        .then((result) => {
            console.log("editIdeaSuccess: ", result);
            res.send({
                res: 1,
                message: "Success"
            });
        })
        .catch((error) => {
            console.log("editIdeaError: ", error);
            res.send({
                res: 0,
                message: "Failed"
            })
        });
};

exports.createProject = (req, res) => {
    console.log(req.body);
    const {token, title} = req.body;
    users
        .findOne({token: token})
        .then((result) => {
            supervisors.findOne({user_id: result._id})
                .then((resul) => {
                    console.log("supervisor_id", resul._id);
                    const nProject = new projects({
                        supervisor_id: resul._id,
                        studentId: "",
                        title: title,
                        idea: "",
                        assessment: "",
                        isPrevious: 0,
                        register_date: new Date(),
                    });
                    nProject
                        .save()
                        .then((saveNewProject) => {
                            console.log("save_project", saveNewProject);
                            res.send({
                                res: 1,
                                message: "Success",
                            });
                        })
                        .catch((saveNewProjectError) => {
                            console.log("save_project", error);
                            res.send({
                                res: 0,
                                message: "Failed",
                            });
                        })
                })
                .catch((error) => {
                    console.log("create_project_supervisor", error);
                    res.send({
                        res: 0,
                        message: "Failed",
                    })
                });
        })
        .catch((error) => {
            console.log("create_project", error);
            res.send({
                res: 0,
                message: "Failed",
            });
        });
};


exports.createIdea = async function (req, res) {
    console.log(req.body);
    const {token, idea} = req.body;

    console.log("getIdeas", ", token:", token);
    const user = await getUserWithToken(token);
    console.log("getIdeasWithSupervisor", user);
    const supervisor = await getSupervisorIdWithUser(user._id);
    const supervisorId = supervisor._id;
    console.log("getIdeasWithSupervisor", supervisorId);

    const nIdea = new ideas({
        supervisor_id: supervisorId,
        idea: idea,
    });
    nIdea
        .save()
        .then((result) => {
            console.log("save_project", result);
            res.send({
                res: 1,
                message: "Success",
            });
        })
        .catch((error) => {
            console.log("save_project", error);
            res.send({
                res: 0,
                message: "Failed",
            });
        });

};


exports.getMessageCount = async function (req, res) {
    console.log(req.body);
    const {token, role} = req.body;
    const user = await getUserWithToken(token);
    console.log("getMessageCountUser", user);
    if (role === 0) {
        const student = await getStudentIdWithUser(user._id);
        const studentId = student._id;
        console.log("getMessageCountStudentId", studentId);
        requests
            .find({"isStudentActive": 1, "studentId": studentId})
            .then((result) => {
                console.log("getMessageCountStudentSuccess", result);
                if (result.length === 0) {
                    res.send({
                        res: 2,
                        message: "No message",
                    });
                } else {
                    res.send({
                        res: 1,
                        message: "Success",
                        requests: result,
                    });
                }
            })
            .catch((error) => {
                console.log("getMessageCountStudentError: ", error);
            });
    }
    else if (role === 1) {
        const supervisor = await getSupervisorIdWithUser(user._id);
        const supervisorId = supervisor._id;
        console.log("getMessageCountSupervisorId", supervisorId);
        requests
            .find({"isSupervisorActive": 1, "supervisorId": supervisorId})
            .then((result) => {
                console.log("getMessageCountSupervisorSuccess : ", result);
                if (result.length === 0) {
                    res.send({
                        res: 2,
                        message: "No message",
                    });
                } else {
                    res.send({
                        res: 1,
                        message: "Success",
                        requests: result,
                    });
                }

            })
            .catch((error) => {
                console.log("getMessageCountSupervisorError: ", error);
            });
    }

};


exports.getMessage = async function (req, res) {
    console.log(req.body);
    const {token, role} = req.body;
    const user = await getUserWithToken(token);
    console.log("getMessageCountUser", user);
    if (role === 0) {
        const student = await getStudentIdWithUser(user._id);
        const studentId = student._id;
        console.log("getMessageCountStudentId", studentId);
        requests
            .find({"isAccepted": {$gt: 0}, "studentId": studentId})
            .then((result) => {
                console.log("getMessageCountStudentSuccess", result);
                if (result.length === 0) {
                    res.send({
                        res: 2,
                        message: "No message",
                    });
                } else {
                    res.send({
                        res: 1,
                        message: "Success",
                        requests: result,
                    });
                }
            })
            .catch((error) => {
                console.log("getMessageCountStudentError: ", error);
            });
    }
    else if (role === 1) {
        const supervisor = await getSupervisorIdWithUser(user._id);
        const supervisorId = supervisor._id;
        console.log("getMessageCountSupervisorId", supervisorId);
        requests
            .find({"supervisorId": supervisorId})
            .then((result) => {
                console.log("getMessageCountSupervisorSuccess : ", result);
                if (result.length === 0) {
                    res.send({
                        res: 2,
                        message: "No message",
                    });
                } else {
                    res.send({
                        res: 1,
                        message: "Success",
                        requests: result,
                    });
                }

            })
            .catch((error) => {
                console.log("getMessageCountSupervisorError: ", error);
            });
    }

};


exports.acceptRequest = (req, res) => {
    console.log("acceptRequestData: ", req.body);
    const {requestId, studentId, supervisorId, isStudentActive, isSupervisorActive, isAccepted} = req.body;
    requests
        .updateOne(
            {
                "_id": requestId
            },
            {
                $set: {
                    "studentId": studentId,
                    "supervisorId": supervisorId,
                    "isStudentActive": isStudentActive,
                    "isSupervisorActive": isSupervisorActive,
                    "isAccepted": isAccepted
                }
            }
        )
        .then((result) => {
            console.log("acceptRequestSuccess: ", result);
            res.send({
                res: 1,
                message: "Success",

            })
        })
        .catch((error) => {
            console.log("acceptRequestError: ", error);
        });


};

exports.setInActiveRequest = async function (req, res) {
    console.log(req.body);
    const {token} = req.body;
    const user = await getUserWithToken(token);
    console.log("getMessageCountUser", user);
    const role = user.role;
    if (role === 0) {
        const student = await getStudentIdWithUser(user._id);
        const studentId = student._id;
        console.log("getMessageCountStudentId", studentId);
        requests
            .updateMany(
                {
                    "isStudentActive": 1,
                    "studentId": studentId,
                },
                {
                    $set: {
                        "isStudentActive": 0,
                    }
                }
            )
            .then((result) => {
                console.log("acceptRequestSuccess: ", result);
                res.send({
                    res: 1,
                    message: "Success",

                })
            })
            .catch((error) => {
                console.log("acceptRequestError: ", error);
            });
    }
    else if (role === 1) {
        const supervisor = await getSupervisorIdWithUser(user._id);
        const supervisorId = supervisor._id;
        console.log("getMessageCountSupervisorId", supervisorId);
        requests
            .updateOne(
                {
                    "supervisorId": supervisorId,
                    "isSupervisorActive": 1
                },
                {
                    $set: {
                        "isSupervisorActive": 0,
                    }
                }
            )
            .then((result) => {
                console.log("acceptRequestSuccess: ", result);
                res.send({
                    res: 1,
                    message: "Success",

                })
            })
            .catch((error) => {
                console.log("acceptRequestError: ", error);
            });
    }

};


exports.setGrade = (req, res) => {
    console.log("setGradeData", req.body);
    const {projectId, comments} = req.body;
    projects.updateOne(
        {"_id": projectId},
        {
            $set: {
                "assessment": comments

            }
        },
    )
        .then((result) => {
            console.log("setGradeSuccess: ", result);
            res.send({
                res: 1,
                message: "Success"
            })
        })
        .catch((error) => {
            console.log("setGradeError", error);
        })
};


exports.setDone = (req, res) => {
    console.log("setGradeData", req.body);
    const {projectId} = req.body;
    projects.updateOne(
        {"_id": projectId},
        {
            $set: {
                "isPrevious": 1    // finish

            }
        },
    )
        .then((result) => {
            console.log("setGradeSuccess: ", result);
            res.send({
                res: 1,
                message: "Success"
            })
        })
        .catch((error) => {
            console.log("setGradeError", error);
        })
};


exports.verify = (req, res) => {
    console.log("user verify", req.body);
    const {verificationToken} = req.body;
    users
        .findOne({verificationToken: verificationToken})
        .then((result) => {
            if (result) {
                result.signState = true;
                result.token = createToken();

                result.save().then((saveResult) => {
                    res.send({
                        success: 1,
                        message: "Verify success",
                        user: saveResult,
                    });
                });
            } else {
                console.log("error_verify", "...");
                res.send({
                    success: 0,
                    message: "...",
                });
            }
        })
        .catch((error) => {
            console.log("error_verify", error);
            res.send({
                success: 0,
                message: error,
            });
        });
};

exports.getPackages = (req, res) => {
    console.log("getPackages user");

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

exports.getApp = (req, res) => {
    console.log("getApp user");

    apps
        .find()
        .then((result) => {
            if (result.length > 0)
                res.send({
                    success: 1,
                    message: "get apps success",
                    app: result[0],
                });
        })
        .catch((error) => {
            console.log("error get app", error);
            res.send({
                success: 0,
                message: error,
            });
        });
};

exports.sendMessage = (req, res) => {
    console.log("sendMessage user");

    const {senderName, senderEmail, message} = req.body;

    const newMessage = new messages({
        senderName: senderName,
        senderEmail: senderEmail,
        message: message,
        createdAt: getDateString(),
    });

    newMessage
        .save()
        .then((result) => {
            res.send({
                success: 1,
                message: "send message success!",
            });
        })
        .catch((error) => {
            res.send({
                success: 0,
                message: "send message fail!",
            });
        });
};

exports.pay = (req, res) => {
    console.log("user pay", req.body);

    const {token, amount, level, paymentMethod} = req.body;

    users
        .findOne({token: token})
        .then((result) => {
            const senderName = result.name;

            const newPayment = new payments({
                senderName: senderName,
                amount: amount,
                paymentMethod: paymentMethod,
                createdAt: getDateString(),
            });

            newPayment
                .save()
                .then((savePaymentResult) => {
                    console.log("savePaymentResult", savePaymentResult);
                })
                .catch((savePaymentError) => {
                    console.log("savePaymentError", savePaymentError);
                });

            result.membership = level;
            result.membershipStartDate = new Date();
            result.membershipEndDate = new Date() + 3600 * 24 * 30;

            result
                .save()
                .then((updateUserResult) => {
                    console.log("updateUserResult", updateUserResult);
                    res.send({
                        success: 1,
                        message: "pay success!",
                        user: updateUserResult,
                    });
                })
                .catch((updateUserError) => {
                    console.log("updateUserError", updateUserError);
                    res.send({
                        success: 0,
                        message: "pay fail!",
                    });
                });
        })
        .catch((error) => {
            res.send({
                success: 0,
                message: "pay fail!",
            });
        });
};


const createToken = () => {
    var rand = function () {
        return Math.random().toString(36).substr(2); // remove `0.`
    };

    var token = function () {
        return rand() + rand(); // to make it longer
    };

    return token(); // "bnh5yzdirjinqaorq0ox1tf383nb3xr"
};


async function getUserWithToken(token) {
    return await users.findOne({token});
}

async function getStudentIdWithUser(user_id) {
    return await students.findOne({user_id: user_id});
}

async function getSupervisorIdWithUser(user_id) {
    return await supervisors.findOne({user_id: user_id}).catch((error) => {
        console.log("getSupervisorIdWithUser:", error);
    });
}

async function getSubmissionCountWithUser(itemId, studentId) {
    return await stuprojects.count({"studentId": studentId, "projectId": itemId});
}

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

exports.apiTest = (req, res) => {
    res.write("api call");
    res.end();
};

