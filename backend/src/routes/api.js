exports.TEST = "/api/user/test";

exports.USER = {
    LOGIN: "/api/user/auth/login",
    REGISTER: "/api/user/auth/register",
    SIGNOUT: "/api/user/auth/signout",
    CREATE_PROJECT: "/api/user/auth/create_project",
    GET_STUDENT: "/api/user/auth/get_student",
    GET_UPCOMING_PROJECT : "/api/user/auth/get_upcoming_project",
    GET_PREVIOUS_PROJECT : "/api/user/auth/get_previous_project",
    GET_UPCOMING_SUBMISSION : "/api/user/auth/upcoming_submission",
    GET_REQUEST_SUPERVISOR : "/api/user/auth/get_request_supervisor",
    GET_REQUEST_MEETING : "/api/user/auth/get_request_meeting",
    GET_IDEAS : "/api/user/auth/get_ideas",
    REQUEST_SUPERVISION : "/api/user/auth/request_supervision",
    GET_LATEST_PROJECT : "/api/user/auth/get_latest_project",
    GET_IDEA_WITH_SUPERVISOR : "/api/user/auth/get_ideas_with_supervisor",
    EDIT_IDEA: "/api/user/auth/edit_idea",
    CREATE_IDEA: "/api/user/auth/create_idea",
    GET_MESSAGE_COUNT: "/api/user/auth/get_message_count",
    GET_MESSAGE: "/api/user/auth/get_message",
    GET_MY_SUBMISSION: "/api/user/auth/get_my_submission",
    GET_MY_PROJECT: "/api/user/auth/get_my_project",
    ACCEPT_REQUEST: "/api/user/auth/accept_request",
    INACTIVE_REQUEST: "/api/user/auth/inactive_request",
    SET_GRADE: "/api/user/auth/set_grade",
    SET_DONE: "/api/user/auth/set_done",

    VERIFY: "/api/user/auth/verify",

    GET_PACKAGES: "/api/user/packages/get",

    GET_APP: "/api/user/apps/get",

    SEND_MESSAGE: "/api/user/messages/send",

    PAY: "/api/user/payments/pay",
};

exports.ADMIN = {
    SIGNIN: "/api/admin/auth/signin",
    SIGNOUT: "/api/admin/auth/signout",
    GET_USERS: "/api/admin/users/get",
    GET_SUBMISSION: "/api/admin/users/submission",
    GET_MESSAGE: "/api/admin/users/message",

    ADD_PACKAGE: "/api/admin/packages/add",
    GET_PACKAGES: "/api/admin/packages/get",

    ADD_APP: "/api/admin/apps/add",
    GET_APPS: "/api/admin/apps/get",

    // GET_MESSAGES: "/api/admin/messages/get",

    GET_PAYMENTS: "/api/admin/payments/get",
};
