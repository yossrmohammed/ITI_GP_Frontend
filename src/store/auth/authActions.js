import { registerStart, registerSuccess, registerFailure } from './authSlice';
import { doctorRegister, patientRegister, nurseRegister } from './authApi';

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
