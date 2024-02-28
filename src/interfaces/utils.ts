export type ReadonlyIntersection<T, U> = {
	readonly [K in keyof (T & U)]: (T & U)[K];
};
