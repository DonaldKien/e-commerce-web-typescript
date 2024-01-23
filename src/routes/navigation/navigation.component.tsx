import { Outlet } from "react-router-dom";
import { LogoContainer, NavLink, NavLinks, NavigationContainer } from "./navigation.styles";
import { ReactComponent as CrwnLogo } from "assets/crown.svg";
import { Fragment, useContext } from "react";
import { UserContext } from "context/user.context";
import { signOutAuthUser } from "utils/firebase/firebase.utils";

const Navigation = () => {
	const { currentUser } = useContext(UserContext);

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
				</NavLinks>
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
