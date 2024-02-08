import { Outlet } from "react-router-dom";
import { LogoContainer, NavLink, NavLinks, NavigationContainer } from "./navigation.styles";
import { ReactComponent as CrwnLogo } from "assets/crown.svg";
import { Fragment } from "react";
import { signOutAuthUser } from "utils/firebase/firebase.utils";
import CartIcon from "conponents/cart-icon/cart-icon.component";
import CartDropdown from "conponents/cart-dropdown/cart-dropdown.component";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "store/user/user.selector";
import { selectIsCartOpen } from "store/cart/cart.selector";

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectIsCartOpen);

	const signOutHandler = async () => {
		await signOutAuthUser();
	};

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to="/">
					<CrwnLogo className="logo" />
				</LogoContainer>

				<NavLinks>
					<NavLink to="/shop">SHOP</NavLink>
					{currentUser ? <span onClick={signOutHandler}>SIGN OUT</span> : <NavLink to="/auth">SIGN IN</NavLink>}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
