import { combineReducers } from "redux";
import { userReducer } from "./user/user.slice";
import { categoriesReducer } from "./categories/categories.slice";
import { cartReducer } from "./cart/cart.slice";

export const rootReducer = combineReducers({
	user: userReducer,
	categoriesMap: categoriesReducer,
	cartReducer: cartReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
