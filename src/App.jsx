import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from '../router'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserData } from './store/auth/authActions';
import { setCookie, getCookie, removeCookie } from './cookies';

function App() {
  const dispatch = useDispatch();
  const token = getCookie('token');
  useEffect(() => {
     if(token){
     dispatch(fetchUserData());
     }
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={ router }/>
    </>
  )
}

export default App
