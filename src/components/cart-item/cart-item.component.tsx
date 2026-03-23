import {
  CartItemContainer,
  CartItemImage,
  ItemDetails,
  Name,
  Price
} from './cart-item.styles';

type CartItems = {
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

const CartItem = ({ cartItem }: { cartItem: CartItems }) => {
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
};

export default CartItem;