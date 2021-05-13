import * as actionTypes from "./actionTypes";

export const login = (user) => {
    return {type: actionTypes.LOGIN, payload: user};
};

export const register = (user) => {
    return {
        type: actionTypes.REGISTER,
        payload: user,
    };
};

export const logOut = () => {
    return {
        type: actionTypes.LOGOUT,
    };
};
