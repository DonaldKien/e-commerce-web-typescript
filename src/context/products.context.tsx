import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "utils/firebase/firebase.utils";

export type CategoryItem = {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
};

export type CategoriesMapValue =
	| {
			[key: string]: CategoryItem[];
	  }
	| {};

type CategoryContextValue = {
	categoriesMap: CategoriesMapValue;
};

const categoryMapInitialValue = {
	categoriesMap: {},
};

export const CategoryContext = createContext<CategoryContextValue>(categoryMapInitialValue);

export const CategoriesProvider = ({ children }: any) => {
	const [categoriesMap, setCategoriesMap] = useState<CategoriesMapValue>(categoryMapInitialValue?.categoriesMap);

	useEffect(() => {
		const getCategoriesMap = async () => {
			const response = await getCategoriesAndDocuments();
			setCategoriesMap(response);
		};
		getCategoriesMap();
	}, []);

	return <CategoryContext.Provider value={{ categoriesMap }}>{children}</CategoryContext.Provider>;
};
