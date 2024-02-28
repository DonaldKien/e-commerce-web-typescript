import { createSelector } from "reselect";
import { IRootState } from "store/root-reducer";
import { CategoriesState } from "./categories.reducer";
import { CategoryMap } from "interfaces/categories";

const selectCategoryReducer = (state: IRootState): CategoriesState => state.categories;

export const selectCategoriesMap = createSelector([selectCategoryReducer], (categoriesSlice): CategoryMap => {
	const categories = categoriesSlice.categories;
	return categories.reduce((acc, category) => {
		const { title, items } = category;
		const titleKey = title.toLowerCase();
		acc[`${titleKey}`] = items;
		return acc;
	}, {} as CategoryMap);
});

export const selectCategoriesIsLoading = createSelector([selectCategoryReducer], (categoriesSlice) => {
	return categoriesSlice.isLoading;
});
