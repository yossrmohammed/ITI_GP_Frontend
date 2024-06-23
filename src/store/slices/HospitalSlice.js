import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios";

export const getHospitalICUs = createAsyncThunk("ICUs/getICUs", async (hospitalId) => {
    const response = await axiosInstance.get(`/intensive-care-units/${hospitalId}`);
    return response.data.data;
});
export const addICU = createAsyncThunk("ICUs/addICU", async (data) => {
    const response = await axiosInstance.post("/intensive-care-units", data);
    return response.data;
})



const HospitalSlice = createSlice({
    name: "ICUs",
    initialState: {
        ICUs: [],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHospitalICUs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getHospitalICUs.fulfilled, (state, action) => {
                state.ICUs = action.payload;
                state.isLoading = false;
            })
            .addCase(getHospitalICUs.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addICU.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addICU.fulfilled, (state, action) => {
                state.ICUs.push(action.payload);
                state.isLoading = false;
            })
            .addCase(addICU.rejected, (state) => {
                state.isLoading = false;
            })

    },


}); 

export default HospitalSlice.reducer;
