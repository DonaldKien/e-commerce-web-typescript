import { compose, createStore, applyMiddleware } from "redux";
import { IRootState, rootReducer } from "./root-reducer";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loggerMiddleware from "middleware/redux-logger";
import { composeWithDevTools } from "@redux-devtools/extension";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

type ExtendedPersistConfig = PersistConfig<IRootState> & {
	blacklist: (keyof IRootState)[];
};

const persistConfig: ExtendedPersistConfig = {
	key: "root",
	storage,
	blacklist: ["user"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

const prodMiddlewares: any[] = [sagaMiddleware];
const devMiddlewares: any[] = [loggerMiddleware];

const composedEnhancer = () => {
	if (process.env.NODE_ENV === "development") {
		return composeWithDevTools(applyMiddleware(...prodMiddlewares, ...devMiddlewares));
	} else {
		return compose(applyMiddleware(...prodMiddlewares));
	}
};

export const store = createStore(persistedReducer, undefined, composedEnhancer());

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
