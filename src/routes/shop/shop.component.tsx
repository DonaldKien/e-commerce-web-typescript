import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "routes/categories-preview/categories-preview.component";
import Category from "routes/category/category.component";
import { fetchCategoriesAsync } from "store/categories/categories.action";

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		fetchCategoriesAsync(dispatch);
	}, [dispatch]);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=":category" element={<Category />} />
		</Routes>
	);
};

export default Shop;
