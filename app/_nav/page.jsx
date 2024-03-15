"use client";
import Link from 'next/link';
import "./nav.css";
import React from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { changeAuth } from '../_state/slice';

const Nav = () => {

  const dispatch = useDispatch();

    const router = useRouter();

    const handleLogout = ()=>{
        router.push('/login');
        dispatch(changeAuth());
        localStorage.removeItem("token");
        localStorage.removeItem("auth");

      }

      let auth  = useSelector((state)=>state.auth.value);

  return (
    <nav className="navbar">
    <ul className="navbar-nav">
       {auth ? ( 
        <>
          <li className="nav-item">
            <Link href="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link href="/register">Register</Link>
          </li>
        </>
       ) : ( 
        <li className="nav-items">
          <li className="nav-item logout" onClick={() => handleLogout()}> Logout </li>
         </li>
       )} 
       
    </ul>
  </nav>
  )
}

export default Nav