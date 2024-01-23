import { useContext } from "react";
import { ProductContext } from "context/products.context";
import ProductCard from "conponents/product-card/product-card.component";
import { ProductsContainer } from "./shop.styles";

const Shop = () => {
	const { products } = useContext(ProductContext);

	return (
		<ProductsContainer>
			{products.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</ProductsContainer>
	);
};

export default Shop;
