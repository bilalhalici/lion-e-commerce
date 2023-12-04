import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.util";
import { ToastContainer, toast } from 'react-toastify';
import { ReactComponent as Lion } from "../../assets/lion.svg";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles.jsx";
import 'react-toastify/dist/ReactToastify.css';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
    toast.info("Signed out successfully");
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <Lion className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {
          isCartOpen && <CartDropdown />
        }
      </NavigationContainer>
      <Outlet />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
      />
    </Fragment>
  );
};

export default Navigation;
