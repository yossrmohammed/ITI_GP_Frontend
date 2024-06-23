import { createSlice } from '@reduxjs/toolkit';
import { setCookie, removeCookie } from '../../cookies'; 

const initialState = {
  user: null,
  error: {},
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerStart(state) {
      state.loading = true;
      state.error = {};
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    registerFailure(state, action) {
      state.loading = false;
      const { field, message } = action.payload;
      state.error[field] = message; // Set error for specific field
    },
    loginStart(state) {
      state.loading = true;
      state.error = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user; 
     
      setCookie('token', action.payload.token, 7); 
    },
    loginFailure(state, action) {
      state.loading = false;
      const { field, message } = action.payload;
      state.error[field] = message; // Set error for specific field
    },
    clearError(state) {
      state.error = {};
    },
    logout(state) {
      state.user = null;
      state.error = {}
      removeCookie('token');
    },

    fetchUserStart(state) {
      state.loading = true;
      state.error = {}
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
    },
    fetchUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    verifyFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePatientStart(state) {
      state.loading = true;
      state.error = {}
    },
    updatePatientSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
    },
    updatePatientFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
  logout,
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  verifyFailure,
  updatePatientStart,
  updatePatientSuccess,
  updatePatientFailure,
} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectError = (state) => state.auth.error;
export default authSlice.reducer;


