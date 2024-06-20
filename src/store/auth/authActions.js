import { registerStart, registerSuccess, registerFailure, loginStart, loginSuccess, loginFailure, fetchUserStart, fetchUserSuccess, fetchUserFailure } from './authSlice';
import { doctorRegister, patientRegister, nurseRegister, login, getUserData } from './authApi';

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
      dispatch(registerFailure({ field:'register', message: error.message })); // Fallback for general error

  }
};


export const loginUser = (formData, setFormErrors) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await login(formData);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(registerFailure({ field:'login', message: error.message }));
  }
};

export const fetchUserData = () => async (dispatch) => {
  dispatch(fetchUserStart());
  try{
    const response =await getUserData();
    console.log(response.data);
    dispatch(fetchUserSuccess(response.data));
   
  } catch (error) {
    console.log(error?.message);
    dispatch(fetchUserFailure(error?.message));
  }
};
