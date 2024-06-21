import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';

import ICUSlice from "./slices/ICUSlice";
import ApplicationSlice from "./slices/ApplicationSlice";
export default configureStore({
    reducer: {
        ICUs: ICUSlice,
        applications: ApplicationSlice,
        auth: authReducer,
    }
});
