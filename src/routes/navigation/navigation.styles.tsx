import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  margin-bottom: 25px;
  width: 100%;
  position: sticky;
  z-index: 999;
  top: 0;
  background-color: #fff;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  display: flex;
  justify-content: center;
  display: flex;
  justify-content: center;
  margin: 5px 0px 0 30px;
`;

export const NavLinks = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

export const TitleContainer = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 38px;
    font-weight: bold;
    user-select: none;
`;