import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

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
