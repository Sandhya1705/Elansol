import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  dob: yup.date().required('Date of Birth is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/register', data);
      localStorage.setItem('user', JSON.stringify(response.data));
      // Redirect to the protected page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" name="name" placeholder="Name" {...register('name')} />
      <p>{errors.name?.message}</p>
      <input type="date" name="dob" placeholder="Date of Birth" {...register('dob')} />
      <p>{errors.dob?.message}</p>
      <input type="email" name="email" placeholder="Email" {...register('email')} />
      <p>{errors.email?.message}</p>
      <input type="password" name="password" placeholder="Password" {...register('password')} />
      <p>{errors.password?.message}</p>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
