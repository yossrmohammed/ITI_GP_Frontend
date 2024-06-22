import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';

import ICUSlice from "./slices/ICUSlice";
import ApplicationSlice from "./slices/ApplicationSlice";
import HospitalSlice from "./slices/HospitalSlice";
export default configureStore({
    reducer: {
        ICUs: ICUSlice,
        applications: ApplicationSlice,
        auth: authReducer,,
        hospitals: HospitalSlice


    }
});
