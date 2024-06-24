import { registerStart, registerSuccess, registerFailure, loginStart, loginSuccess, loginFailure, fetchUserStart, fetchUserSuccess, fetchUserFailure } from './authSlice';
import { doctorRegister, patientRegister, nurseRegister,hospitalRegister , login, getUserData ,verifyEmail, forgetPassword,resetPassword, editPatient} from './authApi';

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
      case 'hospital':
          response = await hospitalRegister(formData);
          break;

      default:
        throw new Error('Invalid role');
    }
    dispatch(registerSuccess(response.data)); 
  } catch (error) {
      dispatch(registerFailure({ field:'register', message: error.message })); 
     throw error;
  }
};


export const loginUser = (formData, setFormErrors) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await login(formData);
    await dispatch(loginSuccess(response.data));
    return response ;
  } catch (error) {
    await dispatch(registerFailure({ field:'login', message: error.message }));
    throw error;
  }
};

export const fetchUserData = () => async (dispatch) => {
  dispatch(fetchUserStart());
  try{
    const response =await getUserData();

    dispatch(fetchUserSuccess(response.data));
    return response;
  } catch (error) {
    console.log(error?.message);
    dispatch(fetchUserFailure(error?.message));
  }
};

export const verify = (formData) => async () => {
  try {
    const response = await verifyEmail({
      timestamp: new Date(), 
      email: formData.email,
    });
    return response;
  } catch (error) {
    dispatch(verifyFailure({ field:'verify', message: error.message }));
  }
};

export const forgetPsswordUser = (formData) => async () => {
  try {
    const response = await forgetPassword(formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPsswordUser = (formData) => async () => {
  try {
    const response = await resetPassword(formData);
    return response;
  } catch (error) {

   throw new Error(error.response.data.message || error.message);
  }
};

export const editPatientAction = (formData, patientID) => async () => {
  try {
    const response = await editPatient(formData, patientID);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || error.message)
  }
}