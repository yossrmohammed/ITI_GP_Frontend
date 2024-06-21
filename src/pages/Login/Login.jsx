import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser,verify,forgetPsswordUser } from "../../store/auth/authActions";
import {selectError} from "../../store/auth/authSlice"
import {selectUser} from "../../store/auth/authSlice"
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2';

const LoginForm = () => {
  const dispatch = useDispatch();
  const errors = useSelector(selectError);
  const user = useSelector(selectUser);
  let navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(location.search);
    const verifyParam = searchParams.get('verify');
    if (validateForm()) {
        if (verifyParam === 'true') {
            try{
                let x =  await dispatch(loginUser(formData));
                const reponse =await dispatch(verify(formData));
                if(reponse.data.message="Email verified successfull"){
                    setAlert({
                        show: true,
                        type: 'success',
                        message: 'Email verified successfully.',
                      });
                    navigate('/', { replace: true });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to verify email, please try again',
                      });
                }
                navigate('/', { replace: true }); 
             }catch(error){
                 //
                
             }
        }else{
                try{
                   let x=  await dispatch(loginUser(formData));
                    navigate('/', { replace: true }); 
                 
                }catch(error){
                    //
                   
                }
        }
    }
   
  };
  const handleForgotPasswordClick = async() => {
    if(/\S+@\S+\.\S+/.test(formData.email)){
        try{
            const x = await dispatch(forgetPsswordUser({email:formData.email}));
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Reset email link send.',
              });
        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to send the reset link, try again',
              });
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please provide valid email to send reset link to it!',
          });
    }
    
  };
  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 bg-cover bg-center"
      style={{ backgroundImage: "url('https://res.cloudinary.com/deqwn8wr6/image/upload/v1718903130/medicine-blue-background-flat-lay_1_ufoakp.jpg')" }}
    >
      <div className="w-full p-6 bg-base-100 border-t-4 border-gray-500 rounded-md rounded-[20px] shadow-lg lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-500">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full input input-bordered"
            />
            {formErrors.email && (
              <p className="text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full input input-bordered"
            />
            {formErrors.password && (
              <p className="text-sm text-red-500">{formErrors.password}</p>
            )}
          </div>
          <button className="btn btn-block btn-neutral" type="submit">
            Login
          </button>
          {errors?.login && (
            <div className="flex justify-center items-center h-full">
            {errors.login === "Request failed with status code 401" ? (
              <p className="text-sm text-red-500">Password or Email incorrect</p>
            ) : (
              <p className="text-sm text-red-500">{errors.login}</p>
            )}
          </div>
        )}
        </form>
        <div className="text-center mt-4">
          <span className="block">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 hover:underline"
              onClick={handleForgotPasswordClick}
            >
              Forgot Password?
            </a>
          </span>
          <span className="block mt-2">
            Don't have an account?{' '}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Sign Up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
