import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
	if (!action.type) {
		return next(action);
	}
	console.log("REDUX TYPE:", action.type);
	console.log("REDUX PAYLOAD:", action.payload);
	console.log("REDUX PREVIOUS STATE:", store.getState());
	next(action);
	console.log("REDUX NEXT STATE:", store.getState());
};

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["user"],
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

const middleWares = [loggerMiddleware];

const composedEnhancer = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancer);

export const persistor = persistStore(store);
