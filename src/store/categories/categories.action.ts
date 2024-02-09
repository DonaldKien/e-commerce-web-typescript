import { CategoriesDocumentData } from "interfaces/categories";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const fetchCategoriesStart = () => ({
	type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
});

export const fetchCategoriesSuccess = (categoriesMap: CategoriesDocumentData) => ({
	type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
	payload: categoriesMap,
});

export const fetchCategoriesFailed = (error: any) => ({
	type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
	payload: error,
});
