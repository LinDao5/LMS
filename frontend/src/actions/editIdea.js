import * as actionTypes from "./actionTypes";


export const editIdea= (ideaItem) => {
    return {
        type: actionTypes.EDIT_IDEA,
        payload: ideaItem,
    };
};