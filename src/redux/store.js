import { createStore,compose } from "redux";
//import rootReducer from "./redux-reducers";
import ingredientReducer from "./redux-reducers/reducer_ingredients";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store = createStore(ingredientReducer,composeEnhancers());