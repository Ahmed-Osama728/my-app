import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import CustomerCard from './CustomerCard';
import { TailSpin } from 'react-loader-spinner';
import CartModal from '../utility/CartModal';
import Form from './Form';
import { getCustomers } from '../features/counter/customerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const CustomersList = ({ modalOpen, setModalOpen, showVisitsBtn }) => {
  const dispatch = useDispatch();

  let newCustomerForm;
  const location = useLocation();
  location.pathname == '/'
    ? (newCustomerForm = true)
    : (newCustomerForm = false);

  const { customers, loading, error } = useSelector((state) => state.customers);
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch, customers.length]);
  return (
    <>
      <ListContainer>
        {loading && (
          <>
            <TailSpin color='#5ece7b' height={100} width={100} />
          </>
        )}
        {error && (
          <>
            <p>{error}</p>
          </>
        )}
        <List>
          {customers.length === 0 ? (
            <p>There is No customers</p>
          ) : (
            customers.map((customer) => (
              <Fragment key={customer?.id}>
                <CustomerCard
                  customerId={customer?.id}
                  data1={customer?.mobileNumber}
                  data2={customer?.firstName}
                  data3={customer?.lastName}
                  title1='Mobile Number'
                  title2='First Name'
                  title3='Last Name'
                  customerVisits={customer?.visits}
                  showVisitsBtn={showVisitsBtn}
                />
              </Fragment>
            ))
          )}
        </List>
        <CartModal show={modalOpen} setModalOpen={setModalOpen}>
          <Styles>
            <Form
              newCustomerForm={newCustomerForm}
              setModalOpen={setModalOpen}
            />
          </Styles>
        </CartModal>
      </ListContainer>
    </>
  );
};
export default CustomersList;

const ListContainer = styled.div`
  margin: 80px 100px 0 100px;
  box-sizing: border-box;
  p {
    color: red;
    font-family: 'Fredocka';
    font-size: 12px;
    height: 30px;
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap: 40px;
  margin-top: 105px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 580px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Styles = styled.div`
  background: lavender;
  padding: 20px;

  h1 {
    border-bottom: 1px solid white;
    color: #3d3d3d;
    font-family: 'Fredoka';
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    padding: 10px;
    text-align: center;
  }

  form {
    background: white;
    border: 1px solid #dedede;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 auto;
    max-width: 500px;
    padding: 30px 50px;
    border-radius: 5px;
  }

  input {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
  }

  label {
    color: #3d3d3d;
    display: block;
    font-family: 'Fredoka';
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 5px;
  }

  p {
    color: red;
    font-family: 'Fredoka';
    font-size: 12px;
    height: 30px;
  }
`;
