import {combineReducers} from "redux";
import auth from "./auth";
import admin from "./admin";
import submission from "./submission";
import editIdea from "./editIdea";

export default combineReducers({
    auth: auth,
    admin: admin,
    submission: submission,
    editIdea: editIdea,
});
