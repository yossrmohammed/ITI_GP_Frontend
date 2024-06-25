import React, { useState, useEffect } from 'react';
import InputField from "../../components/InputField/InputField";
import SelectField from "../../components/SelectField/SelectField";
import FileInput from "../../components/FileInput/FileInput";
import { useSelector, useDispatch } from 'react-redux';
import { register } from "../../store/auth/authActions";
import { selectError } from "../../store/auth/authSlice";
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const errors = useSelector(selectError);
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'doctor',
    history: '',
    gender: 'm',
    birth_date: '',
    image: null,
    university: '',
    qualifications: '',
    city: '',
    fees: '',
    workStart: '',
    workEnd: '',
    workDays: [],
    address:''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    history: '',
    birth_date: '',
    image: '',
    address:'',
  });
  const handleLoginClick = ()=>{
    
    navigate('/login', { replace: true });

  }
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          workDays: [...prevData.workDays, value],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          workDays: prevData.workDays.filter((day) => day !== value),
        }));
      }
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
   
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { role } = formData;
      try {
       
        await dispatch(register(formData, role));

        navigate('/login', { replace: true });
        
      } catch (error) {
        //
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }

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

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
      valid = false;
    } else if (!/^(010|011|012|015)[0-9]{8}$/.test(formData.phone.trim())) {
      errors.phone = 'Phone must be exactly 11 digits';
      valid = false;
    }

    if (formData.role === 'patient') {
      if (!formData.history.trim()) {
        errors.history = 'Medical history is required';
        valid = false;
      }
      if (!formData.gender) {
        errors.gender = 'Gender is required';
        valid = false;
      }
      if (!formData.birth_date) {
        errors.birth_date = 'Birth date is required';
        valid = false;
      }
    }
    if (formData.role === 'hospital') {
      if (!formData.address.trim()) {
        errors.address = 'address his required';
        valid = false;
      }
    }

    if (formData.role !== 'patient' && formData.image) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      if (!validImageTypes.includes(formData.image.type)) {
        errors.image = 'The image field must be a file of type: jpeg, png, jpg, gif.';
        valid = false;
      }
    }

    setFormErrors(errors);
    return valid;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors duration-500 px-5 py-5"
      style={{ backgroundImage: "url('https://res.cloudinary.com/deqwn8wr6/image/upload/v1718903949/medical-bandages-pills-with-copy-space_1_nn3p9e.jpg')" }}
    >
      <div className="xl:max-w-7xl bg-base-100 dark:bg-gray-900 rounded-[30px] drop-shadow-xl border border-gray-300 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
        <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex">
          <img
            src="https://res.cloudinary.com/deqwn8wr6/image/upload/v1718819173/3353d97349c275c2b20fa5a395e8038d_hkghxv.png"
            alt="Illustration"
            className="h-[500px]"
          />
        </div>
        <form className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0" onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#4ea5d2] dark:text-white">
            Create Account
          </h1>
          <div className="w-full mt-5 sm:mt-8">
            <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
              <InputField
                type="text"
                placeholder="Enter Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={formErrors.name}
              />
              <InputField
                type="text"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
              />
              <InputField
                type="password"
                placeholder="Enter Your Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password}
              />
              <InputField
                type="password"
                placeholder="Confirm Your Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={formErrors.confirmPassword}
              />
              <InputField
                type="tel"
                placeholder="Enter Your Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={formErrors.phone}
              />
              <div className="flex items-center gap-2">
                <SelectField
                  options={[
                    { label: 'Doctor', value: 'doctor' },
                    { label: 'Patient', value: 'patient' },
                    { label: 'Nurse', value: 'nurse' },
                    { label: 'Hospital', value: 'hospital' },
                  ]}
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  error={null}
                />
              </div>
              {formData.role === 'patient' && (
                <div className="flex flex-col gap-3">
                  <InputField
                    type="text"
                    placeholder="Enter Medical History"
                    name="history"
                    value={formData.history}
                    onChange={handleChange}
                    error={formErrors.history}
                  />
                  <SelectField
                    options={[
                      { label: 'Male', value: 'm' },
                      { label: 'Female', value: 'f' },
                    ]}
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    error={formErrors.gender}
                  />
                  <InputField
                    type="date"
                    placeholder="Enter Birth Date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleChange}
                    error={formErrors.birth_date}
                  />
                </div>
              )}
              {formData.role === 'doctor' && (
                <div className="flex flex-col gap-3">
                  <FileInput
                    onChange={handleChange}
                    error={formErrors.image}
                  />
                  {formErrors.image && (
                    <p className="text-sm text-red-500">{formErrors.image}</p>
                  )}
                </div>
              )}
               {formData.role === 'hospital' && (
                <div className="flex flex-col gap-3">
                 <InputField
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={formErrors.address}
                  />
                </div>
              )}
              {formData.role === 'nurse' && (
                <div className="flex flex-col gap-3">
                  <FileInput
                    onChange={handleChange}
                    error={formErrors.image}
                  />
                  {formErrors.image && (
                    <p className="text-sm text-red-500">{formErrors.image}</p>
                  )}
                </div>
              )}
              <button className="btn btn-outline btn-info w-[200px] m-auto text-white" type="submit">
                Sign Up
              </button>
              {errors.register && (
                <p className="text-sm m-auto text-red-500">{errors.register}</p>
              )}
            </div>
          </div>
          <span className="block text-center mt-4">
            Already have an account?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800 no-underline"
              onClick={handleLoginClick}>
              Login
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
