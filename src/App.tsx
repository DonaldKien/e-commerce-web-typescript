import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navigation from "routes/navigation/navigation.component";
import Home from "routes/home/home.component";
import Authentication from "routes/authentication/authentication.component";
import Shop from "routes/shop/shop.component";
import Checkout from "routes/checkout/checkout.component";

import { checkUserSession } from "store/user/user.action";

import { GlobalStyle } from "global.styles";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkUserSession());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<GlobalStyle />
			<Routes>
				<Route path="/" element={<Navigation />}>
					<Route index element={<Home />} />
					<Route path="auth" element={<Authentication />} />
					<Route path="shop/*" element={<Shop />} />
					<Route path="checkout" element={<Checkout />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
