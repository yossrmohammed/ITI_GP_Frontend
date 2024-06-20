import { registerStart, registerSuccess, registerFailure } from './authSlice';
import { doctorRegister, patientRegister, nurseRegister } from '../../api/authApi';

export const register = (formData, role) => async (dispatch) => {
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
    dispatch(registerSuccess(response.data)); // Assuming response.data contains user data
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};
