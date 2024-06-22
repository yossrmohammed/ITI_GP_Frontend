import axios from 'axios';
import { setCookie, getCookie, removeCookie } from '../../cookies';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const doctorRegister = async (formData) => {
  try {;
    const response = await axios.post(`${BASE_URL}/DoctorRegister`, formData,{headers: {
      'Content-Type': 'multipart/form-data',
   }});
    
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const patientRegister = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/PatientRegister`, formData);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const nurseRegister = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/NurseRegister`, formData,{headers: {
      'Content-Type': 'multipart/form-data',
    }});
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }

};

export const login = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, formData);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const getUserData = async () => {
  try {
    const token = getCookie('token');
    if (!token) {
      throw new Error('No token found');
    }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${BASE_URL}/user`, config);
        console.log("here");
        console.log(response);
        return response;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.response?.data?.message || error.message);
  }
};


export const verifyEmail = async (formData) => {
  try {
    const token = getCookie('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${BASE_URL}/email/verified`, formData,config);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const forgetPassword = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password`, formData);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const resetPassword = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/reset-password`, formData);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};
/*try {
  await axiosInstance.post('/reset-password', {
    token: this.token,
    email: this.email,
    password: this.password,
    password_confirmation: this.confirmPassword
  });
*/
//email: this.userEmail, 

