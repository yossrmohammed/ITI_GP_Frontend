import axios from 'axios';
import { setCookie, getCookie, removeCookie } from '../../cookies';
const BASE_URL = 'http://127.0.0.1:8000/api';

export const doctorRegister = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/DoctorRegister`, formData);
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
    const response = await axios.post(`${BASE_URL}/NurseRegister`, formData);
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
    throw new Error(error.response?.data?.message || error.message);
  }
};