import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resetPsswordUser} from "../../store/auth/authActions";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const location = useLocation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get('token');
    const emailParam = searchParams.get('user');

    setToken(tokenParam);
    setEmail(emailParam);
  }, [location.search]);


  const validatePassword = (password) => {
    return password.length >= 8;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages({});


    if (!password) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        password: 'Password is required.',
      }));
    } else if (!validatePassword(password)) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least eight characters long.',
      }));
    }

    if (!confirmPassword) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Confirm password is required.',
      }));
    } else if (password !== confirmPassword) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match.',
      }));
    }

    if (Object.keys(errorMessages).length === 0) {

            const x= await dispatch(resetPsswordUser({
                token: token,
                email: email,
                password: password,
                password_confirmation:confirmPassword
            }))
            //
            if(x.data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "The link is invalid, please resend the link again",
                  });
            }else{
                navigate('/login', { replace: true });
            }
        
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 bg-cover bg-center"
     style={{ backgroundImage: "url('https://res.cloudinary.com/deqwn8wr6/image/upload/v1718973530/stethoscope-blank-clipboard-isolated-white_gzsbip.jpg')" }}
    >
      <div className="w-full p-6 bg-base-200 border-t-4 border-gray-600 rounded-md rounded-[20px] shadow-lg lg:max-w-xl flex flex-col lg:flex-row items-center">
        <div className="lg:flex-shrink-0 lg:mr-8 mb-6 lg:mb-0 flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/deqwn8wr6/image/upload/v1718974190/kisspng-vector-graphics-physician-royalty-free-stock-photo-ventricular-strain-the-premier-ekg-resource-for-5bd63c62380850.2023267215407668182295_q8z9rz.png"
            alt="medicine icon"
            className="h-50 w-50 lg:h-56 lg:w-56 object-contain"
          />
        </div>
        <div className="flex-grow">
          <h1 className="text-3xl font-semibold text-center text-gray-500 mb-4">Reset Password</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-500">New Password</label>
              <input
                type="password"
                id="password"
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errorMessages.password && 'border-red-500'}`}
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessages.password && (
                <p className="mt-1 text-xs text-red-500">{errorMessages.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-500">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errorMessages.confirmPassword && 'border-red-500'}`}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errorMessages.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errorMessages.confirmPassword}</p>
              )}
            </div>
            <button type="submit" className="btn btn-block btn-neutral">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default ResetPassword;
