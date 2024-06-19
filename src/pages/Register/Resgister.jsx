import React, { useState } from 'react';
import InputField  from "../../components/InputField/InputField";
import SelectField  from "../../components/SelectField/SelectField";
import FileInput from "../../components/FileInput/FileInput";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'doctor',
    history: '',
    gender: '',
    birthDate: '',
    image: null,
    university: '',
    qualifications: '',
    city: '',
    fees: '',
    workStart: '',
    workEnd: '',
    workDays: [],
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    history: '',
    birthDate: '',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
    } else {
      console.error('Form has errors. Cannot submit.');
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
    } else if (!/^\d{11}$/.test(formData.phone.trim())) {
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
      if (!formData.birthDate) {
        errors.birthDate = 'Birth date is required';
        valid = false;
      }
    }

    setFormErrors(errors);
    return valid;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors duration-500 px-5 py-5">
      <div className="xl:max-w-7xl bg-white dark:bg-gray-900 drop-shadow-xl border border-gray-300 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
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
                type="email"
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
                <label className="text-base label-text">Role</label>
                <SelectField
                  options={[
                    { label: 'Doctor', value: 'doctor' },
                    { label: 'Patient', value: 'patient' },
                    { label: 'Nurse', value: 'nurse' },
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
                      { label: 'Select Gender', value: '' },
                      { label: 'Male', value: 'm' },
                      { label: 'Female', value: 'f' },
                      { label: 'Other', value: 'o' },
                    ]}
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    error={formErrors.gender}
                  />
                  <InputField
                    type="date"
                    placeholder="Enter Birth Date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    error={formErrors.birthDate}
                  />
                </div>
              )}
              { formData.role === 'doctor' && (
                <div className="flex flex-col gap-3">
                  <FileInput
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  />
                </div>
              )}
              {formData.role === 'nurse'  && (
                <div className="flex flex-col gap-3">
                  <FileInput
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  />
                </div>
              )}
              <button className="btn btn-outline btn-info max-w-[200px] text-white" type="submit">
                Sign Up
              </button>
            </div>
          </div>
          <span className="block text-center mt-4">
            Already have an account?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
              Login
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

