import { Fragment } from "react";
import CategoryPreview from "conponents/categories-preview/category-preview.component";
import { useSelector } from "react-redux";
import { CategoryItem } from "interfaces/categories";
import { selectCategoriesMap } from "store/categories/categories.selector";

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCategoriesMap);
	return (
		<Fragment>
			{Object.keys(categoriesMap).map((title) => {
				const titleIndexing = title as keyof typeof categoriesMap;
				const products = categoriesMap[titleIndexing] as unknown as Array<CategoryItem>;
				return <CategoryPreview key={title} title={title} products={products} />;
			})}
		</Fragment>
	);
};

export default CategoriesPreview;
