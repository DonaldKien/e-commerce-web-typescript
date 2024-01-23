import { createContext, useState } from "react";

import PRODUCTS from "data/show-data.json";

interface ProductContextValue {
	products: { id: number; name: string; imageUrl: string; price: number }[];
}

export const ProductContext = createContext<ProductContextValue>({
	products: [],
});

export const ProductsProvider = ({ children }: any) => {
	const [products, setProducts] = useState(PRODUCTS);
	const value: ProductContextValue = { products };
	return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
