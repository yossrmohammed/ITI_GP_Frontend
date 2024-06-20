import { registerStart, registerSuccess, registerFailure, loginStart, loginSuccess, loginFailure } from './authSlice';
import { doctorRegister, patientRegister, nurseRegister, login } from './authApi';

export const register = (formData, role, setFormErrors) => async (dispatch) => {
  dispatch(registerStart());
  try {
    let response;
    switch (role) {
      case 'doctor':
        response = await doctorRegister(formData);
        break;
      case 'patient':
        response = await patientRegister(formData);
        break;
      case 'nurse':
        response = await nurseRegister(formData);
        break;
      default:
        throw new Error('Invalid role');
    }
    dispatch(registerSuccess(response.data)); 
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      const { email } = error.response.data.errors;
      if (email && email.length > 0) {
        setFormErrors({ ...setFormErrors, email: email[0] });
      }
    } else {
      dispatch(registerFailure(error.message));
    }
  }
};


export const loginUser = (formData, setFormErrors) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await login(formData);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      const { email } = error.response.data.errors;
      if (email && email.length > 0) {
        setFormErrors({ ...setFormErrors, email: email[0] });
      }
    } else {
      dispatch(loginFailure(error.message));
    }
  }
};