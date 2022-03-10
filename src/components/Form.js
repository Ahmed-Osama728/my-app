import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addCustomer } from '../features/counter/customerSlice';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Button } from './Header';

const Form = ({ newCustomerForm, setModalOpen }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  location.pathname == '/'
    ? (newCustomerForm = true)
    : (newCustomerForm = false);
  // set the useForm validation schema

  const schema = yup.object().shape({
    firstName: yup.string().required('First Name should be required please'),
    mobileNumber: yup
      .number()
      .positive()
      .integer()
      .required()
      .typeError('this field can only be a number')
      .test(
        'len',
        'mobile number needs to be excatly 9 digits',
        (val) => val.toString().length === 9
      ),
    lastName: yup.string()
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
    let customerData = { ...data, visits: [] };
    console.log(customerData);
    setModalOpen(false);
    dispatch(addCustomer(customerData));

    reset();
  };
  return (
    <>
      {newCustomerForm && (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <label>Mobile Number</label>
          <input
            type='text'
            placeholder='202-***-***'
            {...register('mobileNumber')}
            required
          />
          <p>{errors.mobileNumber?.message} </p>

          <label>First Name</label>
          <input
            {...register('firstName')}
            required
            type='text'
            placeholder='John'
          />
          <p> {errors.firstName?.message} </p>
          <label>Last Name</label>
          <input {...register('lastName')} type='text' placeholder='Doe' />
          <p> {errors.lastName?.message} </p>
          <Button type='submit'>Add Customer</Button>
        </form>
      )}
    </>
  );
};

export default Form;
