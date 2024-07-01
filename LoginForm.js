import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/login', data);
      localStorage.setItem('user', JSON.stringify(response.data));
      // Redirect to the protected page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" name="email" placeholder="Email" {...register('email')} />
      <p>{errors.email?.message}</p>
      <input type="password" name="password" placeholder="Password" {...register('password')} />
      <p>{errors.password?.message}</p>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
