import styled from 'styled-components';

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  padding: 5px 0;

  &:not(:last-child) {
    border-bottom: 1px solid rgb(202, 202, 202);
  }
`;

export const CartItemImage = styled.img`
  width: 30%;
  max-height: 65px;
`;

export const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px 10px 10px;
`;

export const Name = styled.span`
  font-size: 14px;
`;

export const Price = styled.span`
  font-size: 12px;
`;