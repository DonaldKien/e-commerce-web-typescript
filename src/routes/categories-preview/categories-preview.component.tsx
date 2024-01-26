import { Fragment, useContext } from "react";
import { CategoryContext, CategoryItem } from "context/products.context";
import CategoryPreview from "conponents/categories-preview/category-preview.component";

const CategoriesPreview = () => {
	const { categoriesMap } = useContext(CategoryContext);
	return (
		<Fragment>
			{Object.keys(categoriesMap).map((title) => {
				const titleIndexing = title as keyof typeof categoriesMap;
				const products = categoriesMap[titleIndexing] as Array<CategoryItem>;
				return <CategoryPreview key={title} title={title} products={products} />;
			})}
		</Fragment>
	);
};

export default CategoriesPreview;
