import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "conponents/product-card/product-card.component";
import { CategoryContainer, Title } from "./category.styles";
import { useSelector } from "react-redux";
import { CategoryItem } from "interfaces/categories";
import { selectCategoriesMap } from "store/categories/categories.selector";

type CategoryRouteParams = {
	category: string;
};

const Category = () => {
	const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
	const categoriesMap = useSelector(selectCategoriesMap);
	const allItems = categoriesMap[category as keyof typeof categoriesMap];
	const [products, setProducts] = useState<Array<CategoryItem>>(allItems);

	useEffect(() => {
		setProducts(allItems);
	}, [allItems]);

	return (
		<Fragment>
			<Title>{category.toUpperCase()}</Title>
			<CategoryContainer>{products?.length && products.map((product) => <ProductCard key={product.id} product={product} />)}</CategoryContainer>
		</Fragment>
	);
};

export default Category;
