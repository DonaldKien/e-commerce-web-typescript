import { Categories } from "interfaces/categories";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

type CategoriesReducerAction = {
	type: CATEGORIES_ACTION_TYPES;
	payload: Categories;
};

const CATEGORIES_INITIAL_STATE = {
	categories: [],
};

const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action: CategoriesReducerAction) => {
	const { type, payload } = action;

	switch (type) {
		case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
			return {
				...state,
				categories: payload,
			};
		default:
			return state;
	}
};

export default categoriesReducer;
