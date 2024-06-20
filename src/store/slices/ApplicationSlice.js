import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

export const addApplication = createAsyncThunk("applications/addApplication", async (data) => {
    const response = await axiosInstance.post("/intensive-care-applications", data);
    return response.data
});


const ApplicationSlice = createSlice({
    name: "applications",
    initialState: {
        applications: [],
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addApplication.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addApplication.fulfilled, (state, action) => {
                state.isLoading = false;
                state.applications.push(action.payload);
            })
            .addCase(addApplication.rejected, (state) => {
                state.isLoading = false;
            });
    },
}); 

export default ApplicationSlice