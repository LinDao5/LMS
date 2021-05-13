import request from "./request";
import {BASE_URL, USER_API_URL, ADMIN_API_URL} from "./url";
import axios from "axios";


const register = (firstName, lastName, email, phoneNumber, department, password, role) => {
    const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        department: department,
        password: password,
        role:role,
    };

    return request(BASE_URL,{
        url : USER_API_URL.REGISTER,
        method:"POST",
        data,
    });
};

const login = (email, password) => {
    const data = {
        email: email,
        password: password,
    };

    return request(BASE_URL, {
        url: USER_API_URL.LOGIN,
        method: "POST",
        data,
    });
};



const getStudnets = (token) => {
  const data = {
      token: token,
  } ;
  return request(BASE_URL,{
     url: USER_API_URL.GET_STUDENT,
     method:"POST",
     data
  });
};


const getUpcomingProject = (token) => {
    const data = {
        token: token,
    } ;
    return request(BASE_URL,{
        url: USER_API_URL.GET_UPCOMING_PROJECT,
        method:"POST",
        data
    });
};


const getPreviouseProject = (token) => {
    const data = {
        token: token,
    } ;
    return request(BASE_URL,{
        url: USER_API_URL.GET_PREVIOUS_PROJECT,
        method:"POST",
        data
    });
};


const upcomingSubmission = (token,projectIds) => {
    const  data = {
        token:token,
        projectIds : projectIds,
    };
    return request(BASE_URL,{
       url: USER_API_URL.GET_UPCOMING_SUBMISSION,
        method:"POST",
        data
    });
};

const getRequestSupervisor = (token,searchTxt="") => {
    const  data = {
        token:token,
        searchTxt : searchTxt,
    };
    return request(BASE_URL,{
        url: USER_API_URL.GET_REQUEST_SUPERVISOR,
        method:"POST",
        data
    });
};

const requestMeeting = (token,supervisorIds, message) => {
    const  data = {
        token:token,
        supervisorIds : supervisorIds,
        message: message
    };
    return request(BASE_URL,{
        url: USER_API_URL.GET_REQUEST_MEETING,
        method:"POST",
        data
    });
};


const getIdeas = (token,supervisorId) => {
    const  data = {
        token:token,
        supervisorId : supervisorId,
    };
    return request(BASE_URL,{
        url: USER_API_URL.GET_IDEAS ,
        method:"POST",
        data
    });
};

const requestSupervision = (token,projectId, selectedIdea) => {
    const  data = {
        token:token,
        projectId : projectId,
        selectedIdea: selectedIdea
    };
    return request(BASE_URL,{
        url: USER_API_URL.REQUEST_SUPERVISION,
        method:"POST",
        data
    });
};

const getMySubmission = (token) => {
    const data = {
        token: token,
    } ;
    return request(BASE_URL,{
        url: USER_API_URL.GET_MY_SUBMISSION,
        method:"POST",
        data
    });
};

const getMyProject = (token) => {
    const data = {
        token: token,
    } ;
    return request(BASE_URL,{
        url: USER_API_URL.GET_MY_PROJECT,
        method:"POST",
        data
    });
};


///////////////////////////////supervisor////////////////
const getLatestSubmission = (token) => {
    const data = {
        token: token,
    } ;
    return request(BASE_URL,{
        url: USER_API_URL.GET_LATEST_PROJECT,
        method:"POST",
        data
    });
};

const getIdeasWithSupervisor = (token) => {
    const  data = {
        token:token,
    };
    return request(BASE_URL,{
        url: USER_API_URL.GET_IDEA_WITH_SUPERVISOR,
        method:"POST",
        data
    });
};



const createProject = (token,title) => {
    const data = {
        token : token,
        title: title,
    };

    return request(BASE_URL, {
        url: USER_API_URL.CREATE_PROJECT,
        method: "POST",
        data,
    });
};


const editIdea = (token,ideaId, idea) => {
    const data = {
        token : token,
        ideaId: ideaId,
        idea: idea,
    };

    return request(BASE_URL, {
        url: USER_API_URL.EDIT_IDEA,
        method: "POST",
        data,
    });
};

const createIdea = (token,idea) => {
    const data = {
        token : token,
        idea: idea,
    };

    return request(BASE_URL, {
        url: USER_API_URL.CREATE_IDEA,
        method: "POST",
        data,
    });
};


const getMessageCount = (token,role) => {
    const data = {
        token : token,
        role: role,
    };

    return request(BASE_URL, {
        url: USER_API_URL.GET_MESSAGE_COUNT,
        method: "POST",
        data,
    });
};


const getMessage = (token,role) => {
    const data = {
        token : token,
        role: role,
    };

    return request(BASE_URL, {
        url: USER_API_URL.GET_MESSAGE,
        method: "POST",
        data,
    });
};


const setInActiveRequest = (token) => {
    const data = {
        token: token
    };

    return request(BASE_URL, {
        url: USER_API_URL.INACTIVE_REQUEST,
        method: "POST",
        data,
    });
};

const acceptRequest = (requestId,studentId,supervisorId,isStudentActive,isSupervisorActive,isAccepted) => {
    const data = {
        requestId: requestId,
        studentId:  studentId,
        supervisorId: supervisorId,
        isStudentActive: isStudentActive,
        isSupervisorActive: isSupervisorActive,
        isAccepted: isAccepted
    };

    return request(BASE_URL, {
        url: USER_API_URL.ACCEPT_REQUEST,
        method: "POST",
        data,
    });
};


const setGrade = (projectId,comments) => {
    const data = {
        projectId:projectId,
        comments: comments
    };

    return request(BASE_URL, {
        url: USER_API_URL.SET_GRADE,
        method: "POST",
        data,
    });
};

const setDone= (projectId) => {
    const data = {
        projectId:projectId,
    };

    return request(BASE_URL, {
        url: USER_API_URL.SET_DONE,
        method: "POST",
        data,
    });
};


///////////////////////////////////////////////



const adminSignOut = (token) => {
    const data = { token: token };

    return request(BASE_URL, {
        url: ADMIN_API_URL.SIGNOUT,
        method: "POST",
        data,
    });
};

const adminGetUsers = (token) => {
    const data = { token: token };

    return request(BASE_URL, {
        url: ADMIN_API_URL.GET_USERS,
        method: "POST",
        data,
    });
};


const adminGetSubmission= (token) => {
    const data = { token: token };

    return request(BASE_URL, {
        url: ADMIN_API_URL.GET_SUBMISSION,
        method: "POST",
        data,
    });
};


const adminGetMessage= (token) => {
    const data = { token: token };

    return request(BASE_URL, {
        url: ADMIN_API_URL.GET_MESSAGE,
        method: "POST",
        data,
    });
};

const adminAddPackage = (
    token,
    packageName,
    packageDescription,
    packageFileSize,
    packageFile,
    thumbnailFile
) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("packageName", packageName);
    formData.append("packageDescription", packageDescription);
    formData.append("packageFileSize", packageFileSize);
    formData.append("packageFile", packageFile);
    formData.append("thumbnailFile", thumbnailFile);

    const client = axios.create({
        baseURL: BASE_URL,
    });
    return client
        .post(ADMIN_API_URL.ADD_PACKAGE, formData)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const adminGetPackages = (token) => {
    const data = { token: token };

    return request(BASE_URL, {
        url: ADMIN_API_URL.GET_PACKAGES,
        method: "POST",
        data,
    });
};

const adminAddApp = (
    token,
    appVersion,
    appDescription,
    appFileSize,
    appFile
) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("appVersion", appVersion);
    formData.append("appDescription", appDescription);
    formData.append("appFileSize", appFileSize);
    formData.append("appFile", appFile);

    const client = axios.create({
        baseURL: BASE_URL,
    });
    return client
        .post(ADMIN_API_URL.ADD_APP, formData)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

const adminGetApps = (token) => {
    const data = { token: token };

    return request(BASE_URL, {
        url: ADMIN_API_URL.GET_APPS,
        method: "POST",
        data,
    });
};

const adminGetMessages = (token) => {
    const data = { token: token };

    return request(BASE_URL, {
        url: ADMIN_API_URL.GET_MESSAGES,
        method: "POST",
        data,
    });
};

const adminGetPayments = (token) => {
    const data = { token: token };

    return request(BASE_URL, {
        url: ADMIN_API_URL.GET_PAYMENTS,
        method: "POST",
        data,
    });
};

const adminSignIn = (email, password) => {
    const data = {
        email: email,
        password: password,
    };

    return request(BASE_URL, {
        url: ADMIN_API_URL.SIGNIN,
        method: "POST",
        data,
    });
};

export {
    register,
    login,
    createProject,
    getStudnets,
    getUpcomingProject,
    getPreviouseProject,
    getMySubmission,
    upcomingSubmission,
    getIdeas,
    getRequestSupervisor,
    requestMeeting,
    requestSupervision,
    getLatestSubmission,
    getIdeasWithSupervisor,
    editIdea,
    createIdea,
    getMessageCount,
    getMessage,
    getMyProject,
    adminGetMessage,
    adminGetSubmission,
    acceptRequest,
    setInActiveRequest,
    setGrade,
    setDone,
    adminSignIn,
    adminSignOut,
    adminGetUsers,
    adminAddPackage,
    adminGetPackages,
    adminAddApp,
    adminGetApps,
    adminGetMessages,
    adminGetPayments,
}