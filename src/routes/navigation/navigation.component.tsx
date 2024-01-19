import { Outlet } from "react-router-dom";
import { LogoContainer, NavLink, NavLinks, NavigationContainer } from "./navigation.styles";
import { ReactComponent as CrwnLogo } from "assets/crown.svg";
import { Fragment } from "react";

const Navigation = () => {
	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to="/">
					<CrwnLogo className="logo" />
				</LogoContainer>

				<NavLinks>
					<NavLink to="/shop">SHOP</NavLink>
					<NavLink to="/auth">SIGN IN</NavLink>
				</NavLinks>

			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
