import { Middleware } from "redux";
import { IRootState } from "store/root-reducer";

const loggerMiddleware: Middleware<{}, IRootState> = (store) => (next) => (action: any) => {
	if (!action.type) {
		return next(action);
	}
	console.log(`REDUX PREVIOUS STATE ${action.type}:`, {
		payload: action.payload,
		state: store.getState(),
	});
	next(action);
	console.log(`REDUX NEXT STATE ${action.type}:`, {
		payload: action.payload,
		state: store.getState(),
	});
};

export default loggerMiddleware;
