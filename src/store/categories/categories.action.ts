import { CategoriesDocumentData } from "interfaces/categories";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const setCategoriesMap = (categoriesMap: CategoriesDocumentData) => ({
	type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP,
	payload: categoriesMap,
});
