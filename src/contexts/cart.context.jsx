import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const deleteCartItem = (cartItems, productToDelete) =>
  cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);


export const CartContext = createContext({
  isCartOpen: true,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemCart: () => { },
  cartCount: 0,
  removeItemCart: () => { },
  deleteCartItem: () => { },
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

  const removeItemCart = (productToRemove) =>
    setCartItems(removeCartItem(cartItems, productToRemove));

  const deleteItemCart = (productToDelete) =>
    setCartItems(deleteCartItem(cartItems, productToDelete));


  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemCart,
    cartCount,
    removeItemCart,
    deleteItemCart,
    cartTotal,
  };
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};