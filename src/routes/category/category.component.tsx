import { useState, useEffect, Fragment, useContext } from "react";
import { useParams } from "react-router-dom";

import { CategoryContext, CategoryItem } from "context/products.context";
import ProductCard from "conponents/product-card/product-card.component";
import { CategoryContainer, Title } from "./category.styles";

type CategoryRouteParams = {
	category: string;
};

const Category = () => {
	const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
	const { categoriesMap } = useContext(CategoryContext);
	const allItems = categoriesMap[category as keyof typeof categoriesMap];
	const [products, setProducts] = useState<Array<CategoryItem>>(allItems);

	useEffect(() => {
		setProducts(allItems);
	}, [allItems]);

	return (
		<Fragment>
			<Title>{category.toUpperCase()}</Title>
			<CategoryContainer>{products.length && products.map((product) => <ProductCard key={product.id} product={product} />)}</CategoryContainer>
		</Fragment>
	);
};

export default Category;
