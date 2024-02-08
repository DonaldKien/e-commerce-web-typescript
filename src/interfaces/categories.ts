export type CategoryItem = {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
};

export type Category = {
	title: string;
	items: CategoryItem[];
};

export type Categories = Category[];

export type CategoriesMapValue = {
	[key: string]: CategoryItem[];
};

export type CategoriesDocumentData = {
	title: string;
	items: CategoryItem[];
}[];
