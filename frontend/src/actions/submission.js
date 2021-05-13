import * as actionTypes from "./actionTypes";


export const submission= (subItem) => {
    return {
        type: actionTypes.SUBMISSION_ITEM,
        payload: subItem,
    };
};