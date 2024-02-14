import { rootReducer } from "./root-reducer";
import loggerMiddleware from "middleware/redux-logger";
import { configureStore } from "@reduxjs/toolkit";

const prodMiddlewares: any[] = [];
const devMiddlewares: any[] = [loggerMiddleware];

const middlewaresHandler = () => {
	if (process.env.NODE_ENV === "development") {
		return [...prodMiddlewares, ...devMiddlewares];
	} else {
		return [...prodMiddlewares];
	}
};

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(middlewaresHandler()),
});
