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

export default loggerMiddleware;
