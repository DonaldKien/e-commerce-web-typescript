const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
	if (!action.type) {
		return next(action);
	}
	console.log(`REDUX PREVIOUS STATE ${action.type}:`, { payload: action.payload, state: store.getState() });
	next(action);
	console.log(`REDUX NEXT STATE ${action.type}:`, { payload: action.payload, state: store.getState() });
};

export default loggerMiddleware;
