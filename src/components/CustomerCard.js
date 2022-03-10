import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Button } from './Header';
import { useDispatch } from 'react-redux';
import { removeCustomer, removeVisit } from '../features/counter/customerSlice';
const CustomerCard = ({
  customerId,
  data1,
  data2,
  data3,
  title1,
  title2,
  title3,
  showVisitsBtn
}) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const showVisitsHandler = () => {
    history.push(`/customer/${customerId}`);
  };

  let newCustomerForm;
  const location = useLocation();
  location.pathname == '/'
    ? (newCustomerForm = true)
    : (newCustomerForm = false);

  const removeHandler = () => {
    if (newCustomerForm) {
      dispatch(removeCustomer(customerId));
    } else {
      dispatch(removeVisit(customerId));
    }
  };

  return (
    <Container key={customerId}>
      <Content>
        <FirstTitle>
          {title1}: {data1}{' '}
        </FirstTitle>
        <SecondTitle>
          {title2}: {data2}
        </SecondTitle>
        <SecondTitle>
          {title3}: {data3}
        </SecondTitle>
        {showVisitsBtn && (
          <Button type='button' onClick={showVisitsHandler}>
            customer name Visists
          </Button>
        )}
      </Content>
      <RemoveBtn type='button' onClick={removeHandler}>
        Remove
      </RemoveBtn>
    </Container>
  );
};

export default CustomerCard;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: white;
  position: relative;
  opacity: 0.9;
  :hover {
    box-shadow: 0px 8px 70px rgba(168, 172, 176, 0.19);
    opacity: 1;
    transform: scale(1.05);
    transition: transform 250ms ease-in;
    > :first-child > a:last-child > img {
      display: block;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;
const FirstTitle = styled.div`
  font-family: 'Fredoka';
  font-weight: 300;
  font-size: 18px;
  line-height: 160%;
  color: #1d1f22;
`;
const SecondTitle = styled.div`
  font-family: 'Fredoka';
  font-weight: 300;
  font-size: 18px;
  line-height: 160%;
  align-items: center;
  color: #1d1f22;
`;

const RemoveBtn = styled.button`
  :hover {
    transform: scale(1.1);
    transition: transform 250ms ease-in-out;
  }

  border-radius: 20px;
  flex: 0.1;
  height: 30%;
  margin-left: 5px;
  border: none;
  outline: none;
  font-family: 'Fredoka';
  font-weight: 400;
  font-size: 14px;
  line-height: 80%;
  text-align: center;
  cursor: pointer;
  background-color: red;
`;
