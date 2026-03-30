import { FC, memo } from 'react'

import {
  CartItemContainer,
  CartItemImage,
  ItemDetails,
  Name,
  Price
} from './cart-item.styles';

import { CartItem as TCartItem } from '../../store/cart/cart.types'

type CartItemsProps = {
  cartItem: TCartItem
};

const CartItem: FC<CartItemsProps> = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <CartItemContainer>
      <CartItemImage src={imageUrl} alt={name} />
      <ItemDetails>
        <Name>{name}</Name>
        <Price>{quantity} x ${price}</Price>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;