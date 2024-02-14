import { Outlet } from "react-router-dom";
import { LogoContainer, NavLink, NavLinks, NavigationContainer } from "./navigation.styles";
import { ReactComponent as CrwnLogo } from "assets/crown.svg";
import { Fragment } from "react";
import CartIcon from "conponents/cart-icon/cart-icon.component";
import CartDropdown from "conponents/cart-dropdown/cart-dropdown.component";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "store/user/user.selector";
import { selectIsCartOpen } from "store/cart/cart.selector";
import { signOutStart } from "store/user/user.action";

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectIsCartOpen);
	const dispatch = useDispatch();

	const signOutHandler = async () => {
		dispatch(signOutStart());
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
