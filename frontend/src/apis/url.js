// export const BASE_URL = "http://ripcore.gg:5000/api";
export const BASE_URL = "http://93.99.104.177:5001/api";
export const USER_API_URL = {
    TEST: "/user/test",
    REGISTER: "/user/auth/register",
    LOGIN: "/user/auth/login",
    SIGNOUT: "/user/auth/signout",
    CREATE_PROJECT: "/user/auth/create_project",
    GET_STUDENT : "/user/auth/get_student",
    GET_UPCOMING_PROJECT : "/user/auth/get_upcoming_project",
    GET_PREVIOUS_PROJECT : "/user/auth/get_previous_project",
    GET_UPCOMING_SUBMISSION : "/user/auth/upcoming_submission",
    GET_REQUEST_SUPERVISOR : "/user/auth/get_request_supervisor",
    GET_REQUEST_MEETING : "/user/auth/get_request_meeting",
    GET_IDEAS : "/user/auth/get_ideas",
    REQUEST_SUPERVISION : "/user/auth/request_supervision",
    GET_LATEST_PROJECT : "/user/auth/get_latest_project",
    GET_MY_SUBMISSION: "/user/auth/get_my_submission",
    GET_MY_PROJECT: "/user/auth/get_my_project",
    GET_IDEA_WITH_SUPERVISOR : "/user/auth/get_ideas_with_supervisor",
    EDIT_IDEA: "/user/auth/edit_idea",
    CREATE_IDEA: "/user/auth/create_idea",
    GET_MESSAGE_COUNT: "/user/auth/get_message_count",
    GET_MESSAGE: "/user/auth/get_message",
    INACTIVE_REQUEST: "/user/auth/inactive_request",
    ACCEPT_REQUEST: "/user/auth/accept_request",
    SET_GRADE: "/user/auth/set_grade",
    SET_DONE: "/user/auth/set_done",
    VERIFY: "/user/auth/verify",

    GET_PACKAGES: "/user/packages/get",

    GET_APP: "/user/apps/get",

    SEND_MESSAGE: "/user/messages/send",

    PAY: "/user/payments/pay",
};

export const ADMIN_API_URL = {
    SIGNIN: "/admin/auth/signin",
    SIGNOUT: "/admin/auth/signout",

    GET_USERS: "/admin/users/get",
    GET_SUBMISSION: "/admin/users/submission",
    GET_MESSAGE: "/admin/users/message",
    DELETE_USERS: "/admin/users/delete",
    BLOCK_USERS: "/admin/users/block",

    GET_PACKAGES: "/admin/packages/get",
    DELETE_PACKAGE: "/admin/packages/delete",
    ADD_PACKAGE: "/admin/packages/add",

    GET_PAYMENTS: "/admin/payments/get",

    GET_APPS: "/admin/apps/get",
    ADD_APP: "/admin/apps/add",

    GET_MESSAGES: "/admin/messages/get",
};
