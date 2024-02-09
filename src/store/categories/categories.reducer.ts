import { Categories } from "interfaces/categories";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

type CategoriesReducerAction = {
	type: CATEGORIES_ACTION_TYPES;
	payload: Categories;
};

const CATEGORIES_INITIAL_STATE = {
	categories: [],
	isLoading: false,
	error: null,
};

const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action: CategoriesReducerAction) => {
	const { type, payload } = action;

	switch (type) {
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
			return {
				...state,
				isLoading: true,
			};
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
			return {
				...state,
				categories: payload,
				isLoading: false,
			};
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		default:
			return state;
	}
};

export default categoriesReducer;
