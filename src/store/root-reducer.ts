import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import categoriesReducer from "./categories/categories.reducer";
import cartReducer from "./cart/cart.reducer";

export const rootReducer = combineReducers({
	user: userReducer,
	categories: categoriesReducer,
	cartReducer: cartReducer
});

export type IRootState = ReturnType<typeof rootReducer>;