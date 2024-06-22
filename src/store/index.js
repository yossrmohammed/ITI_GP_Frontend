import { configureStore } from "@reduxjs/toolkit";

import ICUSlice from "./slices/ICUSlice";
import ApplicationSlice from "./slices/ApplicationSlice";
import HospitalSlice from "./slices/HospitalSlice";
export default configureStore({
    reducer: {
        ICUs: ICUSlice,
        applications: ApplicationSlice,
        hospitals: HospitalSlice


    }
});
