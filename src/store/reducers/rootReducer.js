import {combineReducers} from "redux";
import authReducer from "./auth";
import mainReducer from './main'
export default combineReducers({
    auth: authReducer,
    main: mainReducer
})