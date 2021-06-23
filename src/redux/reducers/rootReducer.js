import { combineReducers } from "redux";

import customizer from "./customizer/";
import authReducer from "./auth";
import navigatePages from "./navigatePages";

const rootReducer = combineReducers({
	customizer,
	authReducer,
	navigatePages,
});

export default rootReducer;
