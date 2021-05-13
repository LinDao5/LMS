import * as actionTypes from "../actions/actionTypes";

const initialState = {
    subItem:{},
};

const submission = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUBMISSION_ITEM:
            return {
                subItem: action.payload,
            };
        default:
            return state;
    }
};

export default submission;
