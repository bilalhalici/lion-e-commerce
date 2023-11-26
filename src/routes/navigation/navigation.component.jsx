import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.util";
import { ToastContainer, toast } from 'react-toastify';
import { ReactComponent as Lion } from "../../assets/lion.svg";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";

import "./navigation.styles.scss";
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
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Lion className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {
          isCartOpen && <CartDropdown />
        }
      </div>
      <Outlet />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
      />
    </Fragment>
  );
};

export default Navigation;
