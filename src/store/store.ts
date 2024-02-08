import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";

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

const middleWares = [loggerMiddleware];

const composedEnhancer = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancer);
