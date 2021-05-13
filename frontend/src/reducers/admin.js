import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuth: false,
  user: {},
};

const admin = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_SIGNIN:
            return {
                isAuth: true,
                user: action.payload,
            };

        case actionTypes.ADMIN_SIGNOUT:
            return {
                isAuth: false,
                user: {},
            };

        default:
            return state;
    }
};

export default admin;
