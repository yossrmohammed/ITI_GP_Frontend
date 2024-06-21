import { configureStore } from "@reduxjs/toolkit";

import ICUSlice from "./slices/ICUSlice";
import ApplicationSlice from "./slices/ApplicationSlice";
export default configureStore({
    reducer: {
        ICUs: ICUSlice,
        applications: ApplicationSlice
    }
});