import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const Header = ({ setModalOpen }) => {
  const addCustomerHandler = () => {
    setModalOpen(true);
  };

  const location = useLocation();

  return (
    <>
      <HeaderContainer>
        <Button type='button' onClick={addCustomerHandler}>
          Add New {location.pathname == '/' ? 'Customer' : 'Visit'}
        </Button>
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  padding: 0 100px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  background-color: #5ece7b;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  :hover {
    transform: scale(1.1);
    transition: transform 250ms ease-in-out;
  }
  margin-top: 20px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background-color: #5ece7b;
  outline: none;
  font-family: 'Fredoka';
  font-weight: 300;
  font-size: 16px;
  line-height: 120%;
  text-align: center;
  cursor: pointer;
`;
