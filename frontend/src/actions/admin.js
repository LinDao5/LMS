import * as actionTypes from "./actionTypes";

export const signIn = (user) => {
    return { type: actionTypes.ADMIN_SIGNIN, payload: user };
};

export const signOut = () => {
    return { type: actionTypes.ADMIN_SIGNOUT };
};
