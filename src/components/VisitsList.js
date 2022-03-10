import React, { Fragment } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CustomerCard from './CustomerCard';
import CartModal from '../utility/CartModal';
import { Styles } from './CustomersList';
import { addVisit } from '../features/counter/customerSlice';
import { Button } from './Header';

const VisitsList = ({ modalOpen, setModalOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { id } = useParams();
  const { customers } = useSelector((state) => state.customers);
  console.log(customers);
  const customerData = customers.find((c) => c.id === id);

  let newCustomerForm;
  location.pathname == '/'
    ? (newCustomerForm = true)
    : (newCustomerForm = false);

  const schema = yup.object().shape({
    loc: yup.string().required(),
    comment: yup.string()
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmitHandler = (data) => {
    console.log({ data });
    let visitData = { data: data, id: id };
    dispatch(addVisit(visitData));
    setModalOpen(false);

    reset();
  };
  return (
    <ListContainer>
      <List>
        {customerData?.visits ? (
          customerData.visits?.map((visit, i) => (
            <Fragment key={i}>
              <CustomerCard
                customerId={visit?.location}
                data1={visit?.date}
                data2={visit?.location}
                data3={visit?.lastName}
                title1='Date'
                title2='Location'
                title3='Comment'
              />
            </Fragment>
          ))
        ) : (
          <p>There is No visits yet</p>
        )}
      </List>
      <CartModal show={modalOpen} setModalOpen={setModalOpen}>
        <Styles>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <label>Location</label>
            <input
              {...register('loc')}
              required
              type='text'
              placeholder='4014 Wood Street NY'
            />
            <p> {errors.loc?.message} </p>
            <label>Comment</label>
            <input name='comment' {...register('comment')} type='text' />
            <p> {errors.comment?.message} </p>

            <Button type='submit'>Add Customer</Button>
          </form>
        </Styles>
      </CartModal>
    </ListContainer>
  );
};

export default VisitsList;

const ListContainer = styled.div`
  margin: 80px 100px 0 100px;
  box-sizing: border-box;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
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
