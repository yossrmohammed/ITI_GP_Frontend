import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';

import ICUSlice from "./slices/ICUSlice";
import ApplicationSlice from "./slices/ApplicationSlice";
import HospitalSlice from "./slices/HospitalSlice";
import AppointmentSlice from "./slices/AppointmentSlice";
import PrescriptionSlice from "./slices/PrescriptionSlice";
export default configureStore({
    reducer: {
        ICUs: ICUSlice,
        applications: ApplicationSlice,
        auth: authReducer,
        hospitals: HospitalSlice,
        appointments: AppointmentSlice,
        prescriptions: PrescriptionSlice,
    }
});
