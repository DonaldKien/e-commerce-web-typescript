import { Fragment, useContext } from "react";
import { CategoryContext, CategoryItem } from "context/products.context";
import ProductCard from "conponents/product-card/product-card.component";
import { ProductsContainer } from "./shop.styles";

const Shop = () => {
	const { categoriesMap } = useContext(CategoryContext);
	return (
		<Fragment>
			{Object.keys(categoriesMap).map((title) => {
				const titleIndexing = title as keyof typeof categoriesMap;
				return (
					<Fragment key={title}>
						<h2>{title}</h2>
						<ProductsContainer>
							{(categoriesMap?.[titleIndexing] as Array<CategoryItem>).map((item) => (
								<ProductCard product={item} key={item.id} />
							))}
						</ProductsContainer>
					</Fragment>
				);
			})}
		</Fragment>
	);
};

export default Shop;
