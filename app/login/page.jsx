'use client';
import React, { useState, useEffect} from 'react';
import styles from './login.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { useDispatch } from 'react-redux';
import { changeAuth } from '../_state/slice';


const Login = () => {

  const router = useRouter();

  useEffect(() => {
    let auth = localStorage.getItem('auth');
    if(auth)
    {
              router.push('/todo');     
    }
  }, []);

  const dispatch = useDispatch();
    
  const initialData = {
    mobileNumber: '',
    password: '',
  };

 

  const [loginData, setLoginData] = useState(initialData);

  const handleSubmit = async(event) => {
    event.preventDefault();
   
  


    try {
      // Send a POST request to your backend server
      const response = await axios.post('http://localhost:4000/login', loginData);

      router.push('/todo');
      console.log('User data posted successfully:', response.data.token);

     


        dispatch(changeAuth());
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("auth",true);

    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }


    setLoginData(initialData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <div className={styles.loginContainer}>
      
      <form onSubmit={handleSubmit} className={styles.loginForm}>
      <header className={styles.header}>
        <h1 className={styles.title}>Login Page</h1>
      </header>
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input
          type="tel"
          name="mobileNumber"
          id="mobileNumber"
          autoComplete='current-password'
          placeholder="Enter your mobile number"
          pattern="[0-9]+"
          title="Mobile number must contain only numeric characters"
          value={loginData.mobileNumber}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete='current-password'
          placeholder="Enter your Account Password"
          pattern="(?=.*[A-Z]).{8,}"
          title="Password must contain at least 8 characters and at least 1 uppercase letter"
          value={loginData.password}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
