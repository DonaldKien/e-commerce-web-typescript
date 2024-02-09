import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loggerMiddleware from "middleware/redux-logger";
import { composeWithDevTools } from "@redux-devtools/extension";

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["user"],
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

const middleWares = () => {
	let middleWares: any[] = [];
	if (process.env.NODE_ENV === "development") {
		middleWares = [...middleWares, loggerMiddleware];
	}
	return middleWares;
};

const composedEnhancer = () => {
	if (process.env.NODE_ENV === "development") {
		return composeWithDevTools(applyMiddleware(...middleWares()));
	} else {
		return compose(applyMiddleware(...middleWares()));
	}
};

export const store = createStore(persistedReducer, undefined, composedEnhancer());

export const persistor = persistStore(store);
