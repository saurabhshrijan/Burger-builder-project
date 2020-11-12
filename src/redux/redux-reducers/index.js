import { combineReducers } from "redux";
import  ingredients  from "./reducer_ingredients";
const rootReducer = combineReducers({
    ingredients:ingredients
});
export default rootReducer;