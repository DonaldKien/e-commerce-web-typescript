import { CategoriesDocumentData } from "interfaces/categories";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import { getCategoriesAndDocuments } from "utils/firebase/firebase.utils";
import { Dispatch, UnknownAction } from "redux";

const fetchCategoriesStart = () => ({
	type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
});

const fetchCategoriesSuccess = (categoriesMap: CategoriesDocumentData) => ({
	type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
	payload: categoriesMap,
});

const fetchCategoriesFailed = (error: any) => ({
	type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
	payload: error,
});

export const fetchCategoriesAsync = () => {
	return async (dispatch: Dispatch<UnknownAction>) => {
		dispatch(fetchCategoriesStart());
		try {
			const response = (await getCategoriesAndDocuments()) as CategoriesDocumentData;
			dispatch(fetchCategoriesSuccess(response));
		} catch (error) {
			fetchCategoriesFailed(error);
		}
	};
};
