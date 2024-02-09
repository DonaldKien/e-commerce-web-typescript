import { Fragment } from "react";
import CategoryPreview from "conponents/categories-preview/category-preview.component";
import { useSelector } from "react-redux";
import { CategoryItem } from "interfaces/categories";
import { selectCategoriesIsLoading, selectCategoriesMap } from "store/categories/categories.selector";
import Spinner from "conponents/spinner/spinner.component";

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCategoriesMap);
	const categoriesIsLoading = useSelector(selectCategoriesIsLoading);
	return (
		<Fragment>
			{categoriesIsLoading ? (
				<Spinner />
			) : (
				Object.keys(categoriesMap).map((title) => {
					const titleIndexing = title as keyof typeof categoriesMap;
					const products = categoriesMap[titleIndexing] as unknown as Array<CategoryItem>;
					return <CategoryPreview key={title} title={title} products={products} />;
				})
			)}
		</Fragment>
	);
};

export default CategoriesPreview;
