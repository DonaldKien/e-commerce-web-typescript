import { CategoriesMapValue, Category, CategoryItem } from "interfaces/categories";
import { createSelector } from "reselect";
import { IRootState } from "store/root-reducer";

const selectCategoryReducer = (state: IRootState) => {
	return state.categoriesMap;
};

export const selectCategoriesMap = createSelector([selectCategoryReducer], (categoriesSlice) => {
	const categories: Category[] = categoriesSlice.categories;
	return categories.reduce((acc: CategoriesMapValue, category: Category) => {
		const { title, items } = category;
		const titleKey = title.toLowerCase() as keyof CategoriesMapValue;
		acc[`${titleKey}`] = items as CategoryItem[];
		return acc;
	}, {} as CategoriesMapValue);
});

export const selectCategoriesIsLoading = createSelector([selectCategoryReducer], (categoriesSlice) => {
	return categoriesSlice.isLoading;
});
