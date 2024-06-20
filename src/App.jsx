import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from '../router'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserData } from './store/auth/authActions';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={ router }/>
    </>
  )
}

export default App
