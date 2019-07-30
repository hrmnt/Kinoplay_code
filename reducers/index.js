import authReducer from "./AuthReducer";
import userReducer from "./UserReducer";
import errorsReducer from "./ErrorReducer";
import sidebarReducer from "./SidebarReducer";
import gameReducer from "./GameReducer";

import { combineReducers } from "redux";


export default combineReducers({
    authReducer,
    userReducer,
    errorsReducer,
    gameReducer,
    sidebarReducer
})