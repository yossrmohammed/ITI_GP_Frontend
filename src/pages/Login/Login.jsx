import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from "../../store/auth/authActions";
import {selectError} from "../../store/auth/authSlice"
import {selectUser} from "../../store/auth/authSlice"
const LoginForm = () => {
  const dispatch = useDispatch();
  const Error = useSelector(selectError);
  const user = useSelector(selectUser);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
    useEffect(()=>{
        console.log(user);
    },[user])

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
    if (validateForm()) {
      dispatch(loginUser(formData)); // Dispatch login action
    } else {
      console.error('Form has errors. Cannot submit.');
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
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-lg lg:max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
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
        </form>
        <div className="text-center mt-4">
          <span className="block">
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
