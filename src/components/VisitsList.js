import React, { Fragment, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CustomerCard from './CustomerCard';
import CartModal from '../utility/CartModal';
import { Styles } from './CustomersList';
import { addVisit, getCustomers } from '../features/counter/customerSlice';
import { Button } from './Header';

const VisitsList = ({ modalOpen, setModalOpen }) => {
  const dispatch = useDispatch();
  const pageLocation = useLocation();

  const { id } = useParams();

  const { customers, loading, error } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch, customers.length]);

  const customerVisits = customers.filter((item) => item.customerId == id);

  const schema = yup.object().shape({
    location: yup.string().required(),
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
    let visitData = {
      ...data,
      customerId: id,
      date: new Date().toDateString()
    };
    dispatch(addVisit(visitData));
    setModalOpen(false);

    reset();
  };
  return (
    <ListContainer>
      <List>
        {customerVisits.length === 0 ? (
          <p>There is No visits</p>
        ) : (
          customerVisits?.map((v, i) => (
            <Fragment key={i}>
              <CustomerCard
                customerId={v?.id}
                data1={v?.date}
                data2={v?.location}
                data3={v?.comment}
                title1='Date'
                title2='Location'
                title3='Comment'
              />
            </Fragment>
          ))
        )}
      </List>
      <CartModal show={modalOpen} setModalOpen={setModalOpen}>
        <Styles>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <label>Location</label>
            <input
              {...register('location')}
              required
              type='text'
              placeholder='4014 Wood Street NY'
            />
            <p> {errors.location?.message} </p>
            <label>Comment</label>
            <input name='comment' {...register('comment')} type='text' />
            <p> {errors.comment?.message} </p>
            <Button type='submit'>Add visit</Button>
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
  p {
    color: red;
    font-family: 'Fredoka';
    font-size: 12px;
    height: 30px;
  }
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
