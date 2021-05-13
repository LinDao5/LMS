import * as actionTypes from "../actions/actionTypes";

const initialState = {
    isAuth: false,
    user: {},
    subItem:{},
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                isAuth: true,
                user: action.payload,
            };
        case actionTypes.REGISTER:
            return {
                isAuth: true,
                user: action.payload,
            };
        case actionTypes.LOGOUT:
            return {
                isAuth: false,
                user: {},
            };

        default:
            return state;
    }
};

export default auth;
