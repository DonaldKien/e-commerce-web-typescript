import { CategoriesDocumentData } from "interfaces/categories";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "routes/categories-preview/categories-preview.component";
import Category from "routes/category/category.component";
import { setCategoriesMap } from "store/categories/categories.action";
import { getCategoriesAndDocuments } from "utils/firebase/firebase.utils";

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const getCategoriesMap = async () => {
			const response = await getCategoriesAndDocuments() as CategoriesDocumentData;
			dispatch(setCategoriesMap(response));
		};
		getCategoriesMap();
	}, [dispatch]);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=":category" element={<Category />} />
		</Routes>
	);
};

export default Shop;
