import * as actionTypes from "../actions/actionTypes";

const initialState = {
    ideaItem:{},
};

const editIdea = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EDIT_IDEA:
            return {
                ideaItem: action.payload,
            };
        default:
            return state;
    }
};

export default editIdea;
